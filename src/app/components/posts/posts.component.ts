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
    this.posts =
      this.dataService.savedPosts.length > 0 ? this.dataService.savedPosts : [];

    if (this.posts.length === 0) {
      this.apiService.getPosts().subscribe((posts) => {
        this.posts = posts;
        this.dataService.savedPosts = posts; // Cache posts
      });
    }

    this.users =
      this.dataService.savedUsers.length > 0 ? this.dataService.savedUsers : [];

    if (this.users.length === 0) {
      this.apiService.getUsers().subscribe((users) => {
        this.users = users;
        this.dataService.savedUsers = users; // Cache users
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
      const newPostId =
        this.dataService.savedPosts.length > 0
          ? Math.max(...this.dataService.savedPosts.map((post) => post.id)) + 1
          : 1;

      const newPost: Post = {
        userId: this.dataService.currentUser.id,
        id: newPostId,
        title: this.postTitle,
        body: this.postBody,
        hidden: true,
      };

      // Update shared state
      this.dataService.savedPosts = [newPost, ...this.dataService.savedPosts];
      this.posts = this.dataService.savedPosts;

      this.postTitle = '';
      this.postBody = '';
      this.hidden = false;

      this.apiService.sendPost(newPost).subscribe({
        next: () => console.log('Post added successfully!'),
        error: (error) => console.error('Error while adding post:', error),
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
