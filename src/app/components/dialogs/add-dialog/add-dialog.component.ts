import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';


export interface DialogData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
}

export interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget

}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  newEmployee: DialogData
  form: FormGroup
  fileToUpload: File = null;
  fileImage: File = null
  error: boolean = false

  constructor(
    private employeeService: EmployeesService,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    })

  }

  onNoClick() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.newEmployee = this.form.value
      this.employeeService.addEmployee(this.newEmployee).subscribe(
        (id: string) => {
          if (this.fileToUpload != null) {
            this.employeeService.uploadImageEmployee(this.fileToUpload, id).subscribe()
          }
          this.dialogRef.close()
        },
        (error) => {
          this.error = true
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


