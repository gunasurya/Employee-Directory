import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  isDropdownVisible = false;

constructor(private authService:AuthGuardService) {}
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

 toLogOut(){
  this.authService.logout()
 }
  
}
