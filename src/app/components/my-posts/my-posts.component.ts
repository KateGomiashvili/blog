import { Component } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { DataService } from '../../services/data.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent {
  myPosts: Post[] = [];

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const currentUser = this.dataService.currentUser;

    if (currentUser) {
      this.apiService.getPostsByUserId(currentUser.id).subscribe(
        (data: Post[]) => {
          this.myPosts = data; // Assign the posts here
        },
        (error) => {
          console.error('Error fetching user posts:', error);
        }
      );
    }
  }
}
