import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Token, signinUser } from '../../../interfaces/Interfaces';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
  
})
export class SigninComponent implements OnInit {

  user: signinUser
  err: boolean = false
  form: FormGroup

  constructor(
    private router: Router,
    private auth:  AuthService
  ) { 


  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("francorodao802@gmail.com",[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl("Francocjs12",[Validators.required,Validators.minLength(1)]),
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

  
  onSubmit(){
    this.form.markAllAsTouched()
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }
    this.user = this.form.value
    this.signin()
  }

  signin(){
    this.auth.signin(this.user).subscribe(
      (res: Token) =>{
        localStorage.setItem('token',res.token)
        this.router.navigate(['employees'])
        this.err = false
    },
      err=>{
        this.err = true
      })
  }

}
