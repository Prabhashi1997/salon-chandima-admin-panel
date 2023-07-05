import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";


@Injectable({
  providedIn: 'root'
})
export class BeforeGuards implements CanActivate   {

  constructor(private Token: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const beforlogin: boolean = !this.Token.loggedIn();
    // if not, redirect to /
    if (!beforlogin) {
      if (this.Token.isUserAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.Token.isUserEmploy()) {
        this.router.navigate(['/employ/dashboard']);
      } else if (this.Token.isUserCustomer()) {
        this.router.navigate(['/customer/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }
    return beforlogin;
  }

}
