import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../add-dialog/add-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/Interfaces';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  employee: Employee
  form: FormGroup
  fileToUpload: File

  constructor(
    private employeeService: EmployeesService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(this.employee.name, [Validators.required]),
      lastname: new FormControl(this.employee.lastname, [Validators.required]),
      phone: new FormControl(this.employee.phone),
      email: new FormControl(this.employee.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    })


  }

  onNoClick() {
    this.dialogRef.close(false)
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      Object.assign(this.employee, this.form.value)
      this.employeeService.editEmployee(this.employee).subscribe(() => {
        if (this.fileToUpload != null) {
          this.employeeService.uploadImageEmployee(this.fileToUpload, this.employee._id).subscribe(() => this.dialogRef.close(true))
        } else {
          this.dialogRef.close(true)
        }

      })
    }
  }

  fieldInvalid(field) {
    if (this.form.get(`${field}`).touched) {
      return this.form.get(`${field}`).invalid && this.form.get(`${field}`).touched

    } else if (this.form.get(`${field}`).valid) {
      return false
    } else {
      return 'undefined'
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
