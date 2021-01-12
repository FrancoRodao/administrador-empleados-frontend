import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [

  {
    path: '',
    component: EmployeesComponent,
  },

  {
    path: 'employee/:id',
    component: EmployeeComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
