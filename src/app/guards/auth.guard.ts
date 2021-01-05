import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){

  }

  canActivate(): boolean {
    // if (this.auth.checkSession()) {
    //   this.auth.renewToken().subscribe(auth=>{
    //     if(auth){
    //       console.log('entra')
    //       return true
    //     }
    //     return false
    //   })
    // }

    // this.router.navigate(['/signin']);
    // return false;
    return true
  }
  
}
