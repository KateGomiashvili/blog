import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PasswordValidatorService } from '../../services/password-validator.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  errorMessage: string = ''; // For error messages
  successMessage: string = ''; // For success messages
  existingUsers!: User[];
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private validator: PasswordValidatorService
  ) {
    this.registrationForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          ],
        ],
        username: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', Validators.required],
      },

      {
        asyncValidators: [
          this.validator.passwordMatchValidator.bind(this.validator),
        ],
      }
    ); // Add custom validator
  } // To store fetched users

  onRegister(): void {
    this.existingUsers = this.dataService.savedUsers;
    if (this.registrationForm.valid) {
      const { name, username, email, password } = this.registrationForm.value;

      // Check if username already exists
      const userExists = this.existingUsers.some(
        (user) => user.username === username
      );

      if (userExists) {
        this.errorMessage = 'Username is already taken.';
        this.successMessage = '';
      } else {
        const id = this.existingUsers.length + 1;
        // Save the new user (mocked for now)
        const newUser: User = { id, name, username, email, password };
        this.dataService.addUser(newUser).subscribe({
          next: () => {
            this.successMessage = 'Registration successful!';
            this.errorMessage = '';
            this.registrationForm.reset(); // Clear the form
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error adding user:', err);
            this.errorMessage = 'Registration failed. Please try again.';
          },
        });
        console.log(this.existingUsers);
      }
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
      this.successMessage = '';
    }
  }
}
