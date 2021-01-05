import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from '../../interfaces/Interfaces';
import { SureRemoveDialogComponent } from '../dialogs/sure-remove-dialog/sure-remove-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  error: boolean = false
  userInfo: Employee
  userImage: SafeUrl
  loading: boolean = true
  fileToUpload: File = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router,
    public dialog: MatDialog,
    private employeeService: EmployeesService,
    private domSanitizer: DomSanitizer,
    private auth: AuthService
  ) {
    this.userInfo = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    }
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.userInfo._id = params.id
    })
    this.getEmployee()
  }

  getEmployee() {
    this.getImageEmployee()
    this.employeesService.getEmployee(this.userInfo._id).subscribe(
      (data: Employee) => {
        this.userInfo = data
        this.getImageEmployee()
        setTimeout(() => {
          this.loading = false
        }, 500);
      },
      (error => {
        this.error = true
      }))
  }

  back() {
    this.router.navigateByUrl("/employees")
  }

  deleteEmployee() {
    const dialogRef = this.dialog.open(SureRemoveDialogComponent);
    dialogRef.componentInstance.employee = this.userInfo
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result == true) {
          this.employeesService.deleteEmployee(this.userInfo._id).subscribe(() => this.router.navigateByUrl("/employees"))
        }
      },
      ((err) => {
        this.error = true
      }));
  }

  editEmployee() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "350px"
    })
    dialogRef.componentInstance.employee = this.userInfo
    dialogRef.afterClosed().subscribe(() => this.getEmployee())
  }

  next() {
    console.log("ir al siguiente empleado XD")
  }

  getImageEmployee() {
    this.employeeService.getImageEmployee(this.userInfo._id).subscribe(
      (data: any) => {
        this.userImage = this.domSanitizer.bypassSecurityTrustUrl("http://" + this.auth.urlhost + '/' + data.imagePath)
      },
      (err) => {
        this.loading = false
        this.error = true
      })
  }

  editImage(files: FileList) {
    this.fileToUpload = files.item(0);
    this.employeeService.uploadImageEmployee(this.fileToUpload, this.userInfo._id).subscribe(() => this.getImageEmployee())
  }
}
