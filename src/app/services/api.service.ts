import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  users!: User[];
  posts!: Post[];
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
