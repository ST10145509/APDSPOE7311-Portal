import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../account/account.service'; // Assuming this is the correct import path
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.css']
})
export class CustomerPortalComponent implements OnInit {
  accountBalance: number = 0;
  recentTransactions: any[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccountData();
  }

  loadAccountData() {
    this.isLoading = true;
    this.accountService.getAccountData().subscribe(
      (data) => {
        this.accountBalance = data.balance;
        this.recentTransactions = data.transactions;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load account data';
        this.isLoading = false;
        console.error('Error loading account data:', error);
      }
    );
  }

  showDevelopmentMessage() {
    alert('This feature is still in development. Please check back later!');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}