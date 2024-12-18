import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: WelcomePageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'posts', component: PostsComponent },
];
