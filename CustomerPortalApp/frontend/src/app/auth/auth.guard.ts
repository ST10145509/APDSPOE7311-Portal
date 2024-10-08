import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      delay(100), // Add a small delay
      take(1),
      tap(isAuthenticated => {
        console.log('AuthGuard: Is authenticated?', isAuthenticated);
        if (!isAuthenticated) {
          console.log('AuthGuard: Redirecting to login');
          this.router.navigate(['/login']);
        }
      })
    );
  }
  
}