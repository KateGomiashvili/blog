import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../interfaces/user.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  users: User[] = [];

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataService.setSavedUsers(users); // Save users in the service
      console.log(this.dataService.savedUsers);
    });
  }
}
