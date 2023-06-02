import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})

export class AdminEditComponent implements OnInit {

  adminForm;
  isLoading = false;

  admin = {
    firstName: '',
    lastName: '',
    nicNumber: '',
    age: '',
    dateOfBirth: '',
    address: '',
    contactNumber: '',
    emailAddress:'',
    gender: '',
    civilStatus: '',
  }


  constructor() {

  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      nicNumber: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contactNumber: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      civilStatus: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get firstName() {
    return this.adminForm?.get('firstName')
  }

  get lastName() {
    return this.adminForm?.get('lastName')
  }

  get nicNumber() {
    return this.adminForm?.get('nicNumber')
  }

  get age() {
    return this.adminForm?.get('age')
  }

  get dateOfBirth() {
    return this.adminForm?.get('dateOfBirth')
  }

  get address() {
    return this.adminForm?.get('address')
  }

  get contactNumber() {
    return this.adminForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.adminForm?.get('emailAddress')
  }

  get gender() {
    return this.adminForm?.get('gender')
  }

  get civilStatus() {
    return this.adminForm?.get('civilStatus')
  }

  submit(){
    this.adminForm.markAllAsTouched();
    console.log("Form submitted")
  }

}
