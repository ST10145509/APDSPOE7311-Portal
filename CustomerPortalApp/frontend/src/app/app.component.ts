import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="homepage-container">
      <div class="header">
        <img src="assets/logo.png" alt="Bank Logo" class="logo" />  <!-- Placeholder for your logo -->
        <h1>Customer International Payments Portal</h1>
      </div>

      <router-outlet></router-outlet>  <!-- This will render your login/signup components -->

      <footer class="footer">
        <p>&copy; 2024 Global Bank Ltd. All rights reserved. | Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  `,
  styles: [`
    .homepage-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Roboto', sans-serif;
    }

    .header {
      text-align: center;
      margin-top: 40px;
    }

    .logo {
      max-width: 120px;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 2.5em;
      color: #004085;
      margin-bottom: 5px;
    }

    h2 {
      font-size: 1.8em;
      color: #333;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.2em;
      color: #6c757d;
      margin-bottom: 30px;
      max-width: 600px;
      text-align: center;
    }

    .welcome-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    }

    .buttons-container {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .btn {
      padding: 15px 25px;
      font-size: 1em;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-signup {
      background-color: #28a745;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .btn-signup:hover {
      background-color: #218838;
    }

    .footer {
      background-color: #f1f3f4;
      padding: 20px;
      text-align: center;
      font-size: 0.9em;
      color: #6c757d;
    }

    .footer p {
      margin: 0;
    }  `]
})
export class AppComponent {
  title = 'frontend'
}
