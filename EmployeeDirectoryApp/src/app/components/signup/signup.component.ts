import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/employee';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  user: User = new User();

  constructor(private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    private authService:AuthGuardService,
    private router: Router,
    private userService:UserService
    ) { }

  ngOnInit() {
    this.initForm();
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/employees']);
    }
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...userWithoutConfirmPassword } = this.signupForm.value;
      this.user = Object.assign(this.user, userWithoutConfirmPassword);
  
      this.userService.addUser(this.user).subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.dataSharingService.openSnackBar('Signup Done Successfully!....');
            this.signupForm.reset();
          } else {
            this.dataSharingService.openSnackBar(res.errorMessage);
            this.signupForm.reset();

          }
        },
        (error: any) => {
          console.error(error);
          this.dataSharingService.openSnackBar('Error occurred while adding user. Please try again.');
        }
      );
    }
  }
  
  isPasswordValid() {
    const password = this.signupForm.get('password')?.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  }

  isConfirmPasswordValid() {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
