import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotosGuard implements Resolve<Photo[]> {
  constructor(private apiService: ApiService) {}
  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<Photo[]> | Promise<Photo[]> | Photo[] {
  //   return this.apiService.getAlbumById(Number(route.paramMap.get('id')));
  // }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Photo[]> | Promise<Photo[]> | Photo[] {
    const albumId = Number(route.paramMap.get('id'));
    console.log('Resolving photos for Album ID:', albumId); // Debugging
    return this.apiService
      .getAllPhotos()
      .pipe(
        map((photos: Photo[]) =>
          photos.filter((photo) => photo.albumId === albumId)
        )
      );
  }
}
