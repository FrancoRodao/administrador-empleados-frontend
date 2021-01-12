import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from "./alert/error/error.component";
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { SureRemoveDialogComponent } from './dialogs/sure-remove-dialog/sure-remove-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { ErrorComponent } from './error/error.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ErrorAlertComponent,
    AddDialogComponent,
    SureRemoveDialogComponent,
    EditDialogComponent,
    ErrorComponent
  ],  
  
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    ErrorAlertComponent,
    AddDialogComponent,
    SureRemoveDialogComponent,
    EditDialogComponent,
    ErrorComponent
  ]
})
export class ComponentsModule { }
