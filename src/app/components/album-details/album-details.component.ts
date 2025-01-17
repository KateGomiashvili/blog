import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../interfaces/photo';
import { Album } from '../../interfaces/album';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-details',
  imports: [CommonModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss',
})
export class AlbumDetailsComponent {
  photos!: Photo[];
  currentAlbum!: Album;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ photos }) => {
      this.photos = photos;
      console.log(this.photos);
    });

    // this.apiService.getAlbumById(this.currentAlbum.id).subscribe((photos) => {
    //   this.photos = photos;
    // });
  }
}
