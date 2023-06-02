import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;
  isLoading = false;

  register = {
    username: '',
    emailAddress: '',
    password: '',
    passwordAgain: '',
  }

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordAgain: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get username() {
    return this.registerForm?.get('username')
  }

  get emailAddress() {
    return this.registerForm?.get('emailAddress')
  }

  get password() {
    return this.registerForm?.get('password')
  }

  get passwordAgain() {
    return this.registerForm?.get('passwordAgain')
  }

  submit(){
    this.registerForm.markAllAsTouched();
    console.log("Form submitted")
  }
}
