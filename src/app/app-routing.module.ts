import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeComponent } from './components/employee/employee.component';


const routes: Routes = [
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  { path: 'employee/:id', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
