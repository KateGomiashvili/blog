import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Comment } from '../interfaces/comment.interface';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsResolver implements Resolve<Comment[]> {
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Comment[]> | Promise<Comment[]> | Comment[] {
    const postId = route.paramMap.get('id');
    const cachedPost = this.dataService.savedComments.find(
      (comments) => comments.postId.toString() === postId
    );
    return this.apiService.getCommentsById(route.paramMap.get('id'));
  }
}
