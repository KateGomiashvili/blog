import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  users!: User[];
  posts!: Post[];
  comments!: Comment[];
  private apiUrlForPost = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getUsers(): Observable<User[]> {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((users) =>
          users.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: '', // Default password if not provided in API
          }))
        )
      );
  }

  getNameById(nameId: number) {
    return this.users?.find((obj) => obj.id === nameId)?.name;
  }
  sendPost(data: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrlForPost}`, data);
  }
  updatePost(data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrlForPost}/${data.id}`, data);
  }
  getCommentsById(postId: any) {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
  }
  getPostById(postId: any) {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
  sendCommentData(data: Comment, postId: any): Observable<Comment> {
    let apiUrlForComment = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
    return this.http.post<Comment>(`${apiUrlForComment}`, data);
  }
  sendPostData(data: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrlForPost}`, data);
  }
  updatePostData(data: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrlForPost}/${data.id}`, data);
  }
}
