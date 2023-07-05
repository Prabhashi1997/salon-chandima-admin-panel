import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin: boolean = (this.Token.isUserAdmin());
    // if not, redirect to /
    if (!isAdmin) {
      this.router.navigate(['/']);
    }
    return isAdmin;
  }
}
