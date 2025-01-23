import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  signinForm!: FormGroup;
  errorMessage: string = ''; // For error display
  users: User[] = []; // To store fetched users

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.users =
      this.dataService.savedUsers.length > 0 ? this.dataService.savedUsers : [];

    if (this.users.length === 0) {
      this.apiService.getUsers().subscribe((users) => {
        this.users = users;
        this.dataService.savedUsers = users; // Cache users
      });
    }
    // Initialize form
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
    });
  }

  onSignIn(): void {
    if (this.signinForm.valid) {
      const { username, password } = this.signinForm.value;
      const user = this.users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        this.dataService.currentUser = this.dataService.savedUsers.find(
          (x) => x.username == username
        );
        console.log(this.dataService.currentUser);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
    }
  }
}
