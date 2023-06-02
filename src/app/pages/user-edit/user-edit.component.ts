import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm;
  isLoading = false;

  user = {
    firstName: '',
    lastName: '',
    nicNumber: '',
    age: '',
    address: '',
    contactNumber: '',
    emailAddress:'',
    gender: '',
    civilStatus: '',
  }

  constructor() {

  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      nicNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      civilStatus: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get firstName() {
    return this.userForm?.get('firstName')
  }

  get lastName() {
    return this.userForm?.get('lastName')
  }

  get nicNumber() {
    return this.userForm?.get('nicNumber')
  }

  get age() {
    return this.userForm?.get('age')
  }

  get address() {
    return this.userForm?.get('address')
  }

  get contactNumber() {
    return this.userForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.userForm?.get('emailAddress')
  }

  get gender() {
    return this.userForm?.get('gender')
  }

  get civilStatus() {
    return this.userForm?.get('civilStatus')
  }

  submit(){
    this.userForm.markAllAsTouched();
    console.log("Form submitted")
  }


}
