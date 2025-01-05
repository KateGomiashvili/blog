import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
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
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.users = this.dataService.savedUsers;
    // Initialize form
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
    });
    // this.dataService.fetchUsers().subscribe({
    //   next: (users) => {
    //     this.users = users; // Store users locally
    //   },
    //   error: (err) => {
    //     console.error('Error fetching users:', err);
    //   },
    // });
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
