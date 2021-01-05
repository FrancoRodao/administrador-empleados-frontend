import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/Interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User
  err: boolean = false
  form: FormGroup

  constructor(
    private router: Router,
    private auth: AuthService
  ) {



  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })

  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.user = this.form.value
    this.signup()
  }

  signup() {
    this.auth.signup(this.user).subscribe(
      res => {
        this.router.navigateByUrl("signin")
        this.err = false
      },
      err => {
        this.err = true
      })
  }

  fieldInvalid(field){
    if(this.form.get(`${field}`).touched){
      return this.form.get(`${field}`).invalid && this.form.get(`${field}`).touched

    }else if(this.form.get(`${field}`).valid){
      return false
    }else{
      return 'undefined'
    }
  }

}