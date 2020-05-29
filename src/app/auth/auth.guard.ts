import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService, private router: Router) { }

  canLoad(route: Route): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.auth.isLoggedIn) {
      return true;
     }
    else {
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
}
