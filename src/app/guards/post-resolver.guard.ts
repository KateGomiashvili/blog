import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from '../interfaces/post.interface';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({ providedIn: 'root' })
export class postResolver implements Resolve<Post> {
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> | Promise<Post> | Post {
    // return (this.saveService.isChanged == false) ? this.apiService.getPostById(route.paramMap.get('id')) :
    //   this.saveService.savedPosts[Number(route.paramMap.get('id'))];
    const postId = route.paramMap.get('id');

    // Check if the post is already in DataService
    const cachedPost = this.dataService.savedPosts.find(
      (post) => post.id.toString() === postId
    );
    if (cachedPost) {
      return of(cachedPost); // Return cached data as an observable
    } else return this.apiService.getPostById(route.paramMap.get('id'));
  }
}
