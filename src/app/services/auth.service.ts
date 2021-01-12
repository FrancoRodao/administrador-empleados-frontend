import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, Token, signinUser } from '../interfaces/Interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlhost: string = "localhost:3000"
  public url: string = "http://localhost:3000/api" //UTILIZAR VAIRABLE DE ENTORNO

  constructor(
    private http: HttpClient,
    private router: Router) {

  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  checkSession() {
    return this.getToken() ? true:false
  }

  signin(usuario: signinUser) {
    return this.http.post<Token>(this.url + `/signin`, usuario, { withCredentials: true }) //AGERGAR INTERFAZ AL POST Y AL USER
  }

  signup(usuario: User) {
    return this.http.post(this.url + "/signup", usuario)

  }

  signOff() {
    this.http.post(`${environment.API_URL}/logout`, {}, { withCredentials: true }).subscribe()
    localStorage.removeItem('token')
    this.router.navigate(['/auth/signin'])
  }

}
