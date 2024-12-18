import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { ChangedComments } from '../interfaces/changed-comments';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  savedPosts: Post[] = [];
  savedComments: Comment[] = [];
  // allComments: Comment[][] = new Array(51).fill([]);
  allComments: Comment[][] = Array.from({ length: 51 }, () => []);

  // allComments!: Comment[][];
  savedUsers: User[] = [];
  isChanged: boolean = false;
  isNewComment: ChangedComments[] = [{ id: 0, changed: false }];
  isPostChanged: boolean = false;
  constructor() {}
}
