import { Component } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private dataService: DataService) {}
  get isSignedIn(): boolean {
    return !!this.dataService.currentUser; // Returns true if currentUser is set
  }
  get currentUserName(): string {
    return this.dataService.currentUser
      ? this.dataService.currentUser.username
      : 'Sign In';
  }
}
