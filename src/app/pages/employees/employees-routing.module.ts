import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [

  {
    path: '',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: ':id',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
