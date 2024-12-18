import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Post } from '../interfaces/post.interface';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
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
    return this.apiService.getPostById(route.paramMap.get('id'));
  }
}
