import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EmployeeDetailsContainerComponent } from './employee-details-container/employee-details-container.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
  { path: 'login', component: LoginComponent }, // Add this route for the login component
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeDetailsContainerComponent,canActivate: [AuthGuard], children: [
    { path: 'add', component: ModalComponent },
    { path: 'edit/:id', component: ModalComponent }
  ] },
  { path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '/404' }, // Redirect any other unknown routes to the 404 page

];

const jwt : JwtModule = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ["localhost:7011"],
    disallowedRoutes: []
  }
}


@NgModule({
  imports: [RouterModule.forRoot(routes),JwtModule.forRoot(jwt)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
