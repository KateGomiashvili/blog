import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { ChangedComments } from '../interfaces/changed-comments';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  savedPosts: Post[] = [];
  savedComments: Comment[] = [];
  allComments: Comment[][] = new Array(51).fill([]);
  savedUsers: User[] = [];
  isChanged: boolean = false;
  isNewComment: ChangedComments[] = [{ id: 0, changed: false }];
  isPostChanged: boolean = false;
  constructor() {}
}
