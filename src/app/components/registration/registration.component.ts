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
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        name: [''],
        email: [''],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    ); // Add custom validator
  } // To store fetched users

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmpassword = group.get('confirmpassword')?.value;
    return password === confirmpassword ? null : { mismatch: true };
  }

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
