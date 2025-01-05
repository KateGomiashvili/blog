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

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: WelcomePageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'posts', component: PostsComponent },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    resolve: { post: postResolver, comments: CommentsResolver },
  },
  { path: 'my-posts', component: MyPostsComponent },
];
