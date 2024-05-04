import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // User is authenticated, allow navigation
      return true;
    } else if (token && this.jwtHelper.isTokenExpired(token)) {
      // Token expired, redirect to login and clear token
      this.removeToken();
      this.router.navigate(['/login']);
      return false;
    }
    return false;
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }
}
