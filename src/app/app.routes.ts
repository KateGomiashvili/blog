import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostsComponent } from './components/posts/posts.component';
import { postResolver } from './guards/post-resolver.guard';
import { CommentsResolver } from './guards/comments-resolve.guard';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { PhotosGuard } from './guards/photos.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: WelcomePageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    resolve: { post: postResolver, comments: CommentsResolver },
  },
  {
    path: 'albums/:id',
    component: AlbumDetailsComponent,
    resolve: { photos: PhotosGuard },
  },
  { path: 'my-posts', component: MyPostsComponent },
];
