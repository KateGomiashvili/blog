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
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosGuard implements Resolve<Photo[]> {
  constructor(private apiService: ApiService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Photo[]> | Promise<Photo[]> | Photo[] {
    return this.apiService.getAlbumById(Number(route.paramMap.get('id')));
  }
}
