import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidatorService {
  passwordMatchValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmpassword')?.value;

    const isValid = password === confirmPassword;
    return of(isValid ? null : { mismatch: true });
  }
  constructor() {}
}
