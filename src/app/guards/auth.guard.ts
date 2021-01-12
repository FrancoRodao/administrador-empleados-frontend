import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    if (this.auth.checkSession()) {
      return true
    }

    this.router.navigate(['/auth/signin']);
    return false;
  }

  
}

@Injectable({
  providedIn: 'root'
})

export class AuthGuardSignedIn implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canLoad(): boolean{

    if(this.auth.checkSession()){
      console.log('nop')
      return false
    }
    console.log('nop')
    return true

  }

  canActivate(): boolean {
    if (this.auth.checkSession()) {
      this.router.navigate(['/employees']);
      return false
    }

    return true;
  }

}
