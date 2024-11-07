import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent
{
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
});
  }

  onLogin() {
  if (this.loginForm.valid)
  {
    // Simulated login logic; replace with real backend service
    if (this.loginForm.value.username === 'employee' && this.loginForm.value.password === 'password')
    {
      this.router.navigate(['/employee-dashboard']);
    }
    else
    {
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  }
}
}
