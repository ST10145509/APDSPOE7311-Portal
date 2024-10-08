import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CustomerPortalComponent } from './customer/customer-portal.component';
import { WelcomeComponent} from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },   // Route for welcome page
  { path: 'login', component: LoginComponent },   // Route for login page
  { path: 'signup', component: SignupComponent }, // Route for signup page
  { path: 'customer-portal', component: CustomerPortalComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/welcome' }  // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
