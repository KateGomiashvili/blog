import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getPosts().subscribe((posts) => {
      // this.posts = posts;
      this.posts = posts.map((post) => ({ ...post, hidden: true }));
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  showPost(post: Post): void {
    post.hidden = !post.hidden;
  }
}
