import { Component, Inject, Input } from '@angular/core';
import { DialogData } from '../add-dialog/add-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Employee } from '../../../interfaces/Interfaces';

@Component({
  selector: 'app-sure-remove-dialog',
  templateUrl: './sure-remove-dialog.component.html',
  styleUrls: ['./sure-remove-dialog.component.css']
})
export class SureRemoveDialogComponent {

  employee: Employee

  constructor(
    public dialogRef: MatDialogRef<SureRemoveDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
  }
}
