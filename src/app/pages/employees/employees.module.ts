import { NgModule } from '@angular/core';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
  ],
  imports: [
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ComponentsModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
