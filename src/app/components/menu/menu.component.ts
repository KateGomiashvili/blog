import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() shown!: boolean;
  @Output() menuClosed = new EventEmitter<void>();
  constructor(private dataService: DataService, private router: Router) {}
  logOut(): void {
    this.dataService.currentUser = undefined;
    this.router.navigate(['/home']);
    this.shown = false;
    this.menuClosed.emit();
  }
}
