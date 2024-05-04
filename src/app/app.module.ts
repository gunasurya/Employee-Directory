import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainSectionComponent } from './main-section/main-section.component';
import { EmployeeDetailsContainerComponent } from './employee-details-container/employee-details-container.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { MyhttpInterceptor } from './services/myhttp.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainSectionComponent,
    EmployeeDetailsContainerComponent,
    ModalComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
    RouterModule
    
  ],
  providers: [AuthGuardService,{
    provide:HTTP_INTERCEPTORS,
    useClass:MyhttpInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
