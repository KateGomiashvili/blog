import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { UnderlineDirective } from '../../directives/underline.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MenuComponent,
    UnderlineDirective,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuVisible: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  get isSignedIn(): boolean {
    return !!this.dataService.currentUser; // Returns true if currentUser is set
  }

  get currentUserName(): string {
    return this.dataService.currentUser
      ? this.dataService.currentUser.username
      : 'Sign In';
  }

  handleButtonClick(): void {
    if (!this.isSignedIn) {
      this.router.navigate(['/login']); // Redirect to the sign-in page
    } else {
      this.menuVisible = !this.menuVisible;
    }
  }
  closeMenu(): void {
    this.menuVisible = false; // Reset menu visibility
  }
}
