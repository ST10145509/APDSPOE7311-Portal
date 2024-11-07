import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize form with validation
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Temporary authentication logic; replace with real backend logic
      const { username, password } = this.loginForm.value;
      if (username === 'employee' && password === 'password') {
        this.router.navigate(['/employee-dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    }
  }
}
