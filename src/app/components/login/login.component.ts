import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthGuardService,
    private dataSharingService: DataSharingService,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/employees']);
    }
  }

  submitForm() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.login(loginData).subscribe(
        (res) => {
          const token = (<any>res).data;
          this.authService.storeToken(token)
          if (token) {
            this.router.navigate(['/employees']);
            this.dataSharingService.openSnackBar('Login Successful');
          } else {
            this.dataSharingService.openSnackBar('Invalid Credentials');
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.dataSharingService.openSnackBar('Login Error!!!!');
        }
      );

      this.loginForm.reset();
    }
  }
}
