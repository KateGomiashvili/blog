import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { ChangedComments } from '../interfaces/changed-comments';
import { Comment } from '../interfaces/comment.interface';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  savedPosts: Post[] = [];
  savedComments: Comment[] = [];
  // allComments: Comment[][] = new Array(51).fill([]);
  allComments: Comment[][] = Array.from({ length: 50 }, () => []);
  savedUsers!: User[];
  // allComments!: Comment[][];
  currentUser?: User;
  isChanged: boolean = false;
  isNewComment: ChangedComments[] = [{ id: 0, changed: false }];
  isPostChanged: boolean = false;
  constructor(private apiService: ApiService) {}
  fetchUsers(): Observable<User[]> {
    return this.apiService.getUsers();
  }

  setSavedUsers(users: User[]): void {
    this.savedUsers = users;
  }
  addUser(user: User): Observable<User> {
    // Push to local `savedUsers` and simulate an API call
    this.savedUsers.push(user);

    // If you want to make an actual API request to save the user:
    // return this.http.post<User>(this.usersApiUrl, user);

    // For now, we simulate adding the user with RxJS's `of`
    return of(user);
  }
}
