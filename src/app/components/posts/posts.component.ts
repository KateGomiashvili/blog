import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
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
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.apiService.getPosts().subscribe((posts) => {
      // this.posts = posts;
      this.posts = posts.map((post) => ({ ...post, hidden: true }));
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  getNameById(nameId: number) {
    // get names for POST'S USER
    return this.users?.find((obj) => obj.id === nameId)?.name;
  }
  showPost(post: Post): void {
    post.hidden = !post.hidden;
  }
  showWindow() {
    // open form for new post
    this.hidden = !this.hidden;
  }
  addPost() {
    this.dataService.isChanged = true; //variable to save changed data is service
    const newUserId = this.users.length + 1;
    const newPostId = this.posts.length + 1;

    this.users = [
      {
        id: newUserId,
        name: this.postAuthor,
        username: '',
        email: '',
        password: '',
      },
      ...this.users,
    ];
    this.newPost = {
      userId: newUserId,
      id: newPostId,
      title: this.postTitle,
      body: this.postBody,
      hidden: true,
    };
    this.posts = [this.newPost, ...this.posts];

    this.dataService.savedPosts = this.posts;
    this.dataService.savedUsers = this.users;

    this.hidden = !this.hidden; // hide form

    this.postTitle = ''; //empty input values
    this.postAuthor = '';
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
