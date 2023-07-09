import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../service/user.service";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {CommonService} from "../../service/common.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  isLoading = false;
  loginSub;

  login = {
    email: '',
    password: '',
  }

  constructor(
      private userService: UserService,
      private tokenService: TokenService,
      private router: Router,
      private authService: AuthService,
      private service: CommonService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get username() {
    return this.loginForm?.get('username')
  }

  get password() {
    return this.loginForm?.get('password')
  }

  submit(){
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.invalid) {
      this.loginSub = this.userService.login(this.login).subscribe(
          data => {
            console.log(data);
            if (!!data['token']){

              this.handleResponse(data['token']);

            } else {
              Swal.fire(
                  'Login Error!',
                  'connection error!',
                  'error'
              );
            }
          },
          error => {
            console.log(error);
            Swal.fire(
                'Login Error!',
                error.error.msg,
                'error'
            );
            this.handleError(error)
          }
      );
    }
  }
  handleError(error){
    console.log(error)
  }

  handleResponse(data) {
    this.tokenService.handle(data);
    this.authService.changeAuthStatus(true);
    const name = this.tokenService.getFirstName() + ' ' + this.tokenService.getLastName();
    const image = this.tokenService.getImg();
    this.service.changeData({ image: image, name: name })
    if (this.tokenService.isUserAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.tokenService.isUserEmploy()) {
      this.router.navigate(['/employ/dashboard']);
    } else if (this.tokenService.isUserCustomer()) {
      this.router.navigate(['/customer/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
