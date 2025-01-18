import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  currentPost!: Post;
  comments!: Comment[]; //current post comments
  newCommentName: string = ''; //ngModel name for name of new comment
  newCommentBody: string = ''; //ngModel name for body of new comment
  postNewTitle: string = ''; //ngModel name for edited post title
  postNewBody: string = ''; //ngModel name for edited post body
  newComment!: Comment;
  showEditWindow: boolean = false;
  commentsAreShown: boolean = true;
  ownPost: boolean = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    const currentId = Number(this.route.snapshot.paramMap.get('id'));

    // Check if the post exists in savedPosts
    this.currentPost = this.dataService.savedPosts.find(
      (post) => post.id === currentId
    ) ?? { id: 0, userId: 0, title: '', body: '', hidden: false };

    // If not found, fetch from API and update savedPosts
    if (!this.currentPost) {
      this.apiService.getPosts().subscribe((posts) => {
        this.dataService.savedPosts = posts;
        this.currentPost = posts.find((post) => post.id === currentId) ?? {
          id: 0,
          userId: 0,
          title: '',
          body: '',
          hidden: false,
        };
      });
    }

    // Load comments similarly
    if (!this.dataService.allComments[currentId]) {
      this.apiService.getCommentsById(currentId).subscribe((comments) => {
        this.dataService.allComments[currentId] = comments;
        this.comments = comments;
      });
    } else {
      this.comments = this.dataService.allComments[currentId];
    }

    // Check if the current user owns the post
    this.ownPost =
      this.currentPost?.userId === this.dataService.currentUser?.id;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container =
        this.elementRef.nativeElement.querySelector('.comments');
      container.scrollTop = container.scrollHeight;
    });
  }

  goBack() {
    this.router.navigate(['/posts']).then(() => {
      // Ensure posts are reloaded from saved state
      this.dataService.savedPosts = this.dataService.savedPosts; // Optional, for clarity
    });
  }

  addNewComment() {
    this.dataService.isNewComment.push({
      id: this.currentPost.id,
      changed: true,
    }); //comments array for current post is changed
    this.newComment = {
      postId: this.currentPost?.id,
      id: this.comments.length + 1,
      body: this.newCommentBody,
    };
    this.comments = [...this.comments, this.newComment];
    this.dataService.allComments[this.currentPost.id] = this.comments; //saved updated comment array

    console.log(this.dataService.allComments);

    this.dataService.savedComments = this.comments;

    this.scrollToBottom();
    this.newCommentName = '';
    this.newCommentBody = '';

    this.apiService
      .sendCommentData(this.newComment, this.currentPost?.id)
      .pipe(
        tap(() => console.log('Comment added successfully!')),
        catchError((error) => {
          console.error('Error while adding comment:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  editPost() {
    this.showEditWindow = true;
    this.commentsAreShown = false;
  }
  closeWindow() {
    this.showEditWindow = false;
  }
  updatePost() {
    this.showEditWindow = false;
    this.commentsAreShown = !this.commentsAreShown;
    this.dataService.isPostChanged = true;
    this.currentPost.title = this.postNewTitle;
    this.currentPost.body = this.postNewBody;

    const index = this.dataService.savedPosts.findIndex(
      (post) => post.id === this.currentPost?.id
    );
    if (index != -1) {
      this.dataService.savedPosts[index] = this.currentPost;
    }

    this.apiService
      .updatePost(this.currentPost)
      .pipe(
        tap(() => console.log('Current post updated successfully!')),
        catchError((error) => {
          console.error('Error while updating data:', error);
          return of(null); // Return an observable to prevent errors from propagating
        })
      )
      .subscribe();
    console.log(this.currentPost);
  }
}
