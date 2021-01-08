import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../components/dialogs/add-dialog/add-dialog.component';
import { Router } from '@angular/router';
import { Employee} from '../../interfaces/Interfaces';
import { SureRemoveDialogComponent } from '../../components/dialogs/sure-remove-dialog/sure-remove-dialog.component';
import { EditDialogComponent } from '../../components/dialogs/edit-dialog/edit-dialog.component';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import { LoadingService } from 'src/app/services/loading.service';




@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit{
  displayedColumns: string[] = ['name', 'lastname', 'phone', 'email', 'actions'];
  ELEMENT_DATA: Employee[] = [];
  dataSource: Employee[] = []
  error: boolean = false
  
  
  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog,
    private router: Router,
  ){

  }

  ngOnInit(){
    this.getEmployees()
  }

  letra(query){
    console.log(query)
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(
      (res: Employee[]) => {
        this.ELEMENT_DATA = res
        this.dataSource = this.ELEMENT_DATA;
      },
      (error) => {
        this.error = true
      })
  }

  addEmployee(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: "350px"
    })

    dialogRef.afterClosed()
             .subscribe(() => this.getEmployees())
  }

  goEmployee(employeeId: string){
    this.router.navigate(['/employee',employeeId])
  }

  deleteEmployee(employee: Employee){
    const dialogRef = this.dialog.open(SureRemoveDialogComponent);
    dialogRef.componentInstance.employee = employee
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true){
          this.employeesService.deleteEmployee(employee._id)
                               .subscribe(() => this.getEmployees())
        }
      },
      err=>{
        this.error = true
      });
  }

  editEmployee(employee: Employee){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "350px"
    })
    dialogRef.componentInstance.employee = employee
    dialogRef.afterClosed()
             .subscribe(() => this.getEmployees() )
  }

  pdf(){
    var pdf = new jsPDF();
    pdf.text(20,20,"EMPLOYEES TABLE");
    
    console.log(this.dataSource)
    console.log(this.ELEMENT_DATA)

    var columns = ['name', 'lastname', 'phone', 'email'];
    var data = []

    for (let index = 0; index < this.dataSource.length; index++) {
      const element = this.dataSource[index];
      data.push([element.name,element.lastname,element.phone,element.email])
      
    }

    pdf.autoTable(columns,data,
    { margin:{ top: 25 }}
    );
    
    pdf.save();
  }

}






