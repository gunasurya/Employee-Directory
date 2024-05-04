import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }

  isPageNotFound(): boolean {
    // Check if the current route matches the 404 route
    return this.router.url === '/404';
  }

  isMainSection(): boolean {
    // Check if the current route belongs to the "main section"
    // Modify this condition to match the route pattern of your "main section" pages
    return (
      !this.isLoginPage() && !this.isSignupPage() && !this.isPageNotFound()
    );
  }
}
