import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  signupSuccess = false;
  signupError = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
  }, { validator: this.passwordMatchValidator });
  
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      
      // Log the form values to ensure all are being passed
      console.log('Form Values:', { username, email, password });
  
      this.authService.signup(username, email, password).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed:', error);
          if (error.error && error.error.error) {
            this.signupError = error.error.error;
          } else if (error.error && error.error.details) {
            this.signupError = Object.values(error.error.details).join(', ');
          } else {
            this.signupError = 'An unexpected error occurred. Please try again.';
          }
        }
      );
    } else {
      this.signupError = 'Form is invalid. Please check the fields.';
    }
  }
  
  

  getPasswordErrorMessage() {
    const passwordControl = this.signupForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('pattern')) {
      return 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character.';
    }
    return '';
  }
}
