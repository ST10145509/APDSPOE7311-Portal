import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  newCustomer = { username: '', password: '' };

  constructor(private router: Router) { }

  createCustomer() {
    alert(`Customer account for ${this.newCustomer.username} created successfully!`);
    this.newCustomer = { username: '', password: '' };  // Reset form fields
  }

  logout() {
    alert('Logged out');
    this.router.navigate(['/login']);
  }
}
