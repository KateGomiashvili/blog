import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import { Album } from '../../interfaces/album';
import { Photo } from '../../interfaces/photo';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  imports: [RouterLink, CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  albums!: Album[];
  users!: User[];
  albumLength!: [];
  total: number[] = [];
  totalAlbums!: number;
  photos!: Photo[];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      const totalAlbums = albums.length;
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiService.getPhotos().subscribe((photos) => {
      this.photos = photos;
    });

    console.log(this.total);
  }
  getNameById(nameId: number) {
    return this.users?.find((obj) => obj.id === nameId)?.name;
  }

  getPhotosNumber(albumId: number) {
    return this.photos?.filter((photo) => photo.albumId === albumId).length;
  }
}
