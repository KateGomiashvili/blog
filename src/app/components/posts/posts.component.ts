import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts!: Post[];
  users!: User[];
  hiddenpost: boolean = true;
  hidden: boolean = false;
  postTitle!: string;
  postAuthor!: string;
  postBody!: string;
  newPost!: Post;
  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.dataService.savedPosts.length > 0) {
      this.posts = this.dataService.savedPosts;
      console.log(this.dataService.savedPosts);
    } else {
      this.apiService.getPosts().subscribe((posts) => {
        this.posts = posts;
        this.dataService.savedPosts = posts;
      });
    }
    if (this.dataService.savedUsers) {
      this.users = this.dataService.savedUsers;
    } else {
      this.apiService.getUsers().subscribe((users) => {
        this.users = users;
      });
    }
  }
  getNameById(nameId: number) {
    return this.users?.find((obj) => obj.id === nameId)?.name;
  }
  showPost(post: Post): void {
    post.hidden = !post.hidden;
  }
  showWindow() {
    if (this.dataService.currentUser) {
      this.hidden = !this.hidden;
    } else {
      this.router.navigate(['/login']);
    }
  }
  addPost() {
    if (this.dataService.currentUser) {
      this.dataService.isChanged = true;
      const newPostId = this.posts.length + 1;

      this.newPost = {
        userId: this.dataService.currentUser.id,
        id: newPostId,
        title: this.postTitle,
        body: this.postBody,
        hidden: true,
      };
      this.posts = [this.newPost, ...this.posts];

      this.dataService.savedPosts = this.posts;
      // this.dataService.savedUsers = this.users;

      this.hidden = !this.hidden;

      this.postTitle = ''; //empty input values
      this.postBody = '';

      //send data
      this.apiService
        .sendPost(this.newPost)
        .pipe(
          tap((response) => {
            console.log('Post sent successfully!', response);
          }),
          catchError((error) => {
            console.error('Error while sending data:', error);
            return of(null);
          })
        )
        .subscribe();
      console.log(this.posts);
    }
  }
}
