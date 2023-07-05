import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AfterGuards implements CanActivate  {

  constructor(private Token: TokenService, private Auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const afterlogin: boolean = (this.Token.loggedIn());
    // if not, redirect to /
    if (!afterlogin) {
      this.router.navigate(['/login']);
    }
    return afterlogin;
  }

}
