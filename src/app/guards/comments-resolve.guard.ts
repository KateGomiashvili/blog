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
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsResolver implements Resolve<Comment[]> {
  constructor(private apiService: ApiService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Comment[]> | Promise<Comment[]> | Comment[] {
    return this.apiService.getCommentsById(route.paramMap.get('id'));
  }
}
