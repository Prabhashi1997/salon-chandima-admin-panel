import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  isLoading = false;

  login = {
    username: '',
    password: '',
  }

  constructor() { }

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
    console.log("Form submitted")
  }

}
