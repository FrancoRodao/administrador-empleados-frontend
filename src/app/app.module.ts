//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//ANGULAR MATERIAL
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";


//DIALOGS
import { AddDialogComponent } from './components/dialogs/add-dialog/add-dialog.component';
import { SureRemoveDialogComponent } from './components/dialogs/sure-remove-dialog/sure-remove-dialog.component';
import { EditDialogComponent } from './components/dialogs/edit-dialog/edit-dialog.component';

//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
// import { LoadingService } from './services/loading.service';




@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    EmployeesComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    AddDialogComponent,
    EmployeeComponent,
    SureRemoveDialogComponent,
    EditDialogComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
