import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm;
  isLoading = false;

  customer = {
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
    this.customerForm = new FormGroup({
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
    return this.customerForm?.get('firstName')
  }

  get lastName() {
    return this.customerForm?.get('lastName')
  }

  get nicNumber() {
    return this.customerForm?.get('nicNumber')
  }

  get age() {
    return this.customerForm?.get('age')
  }

  get address() {
    return this.customerForm?.get('address')
  }

  get contactNumber() {
    return this.customerForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.customerForm?.get('emailAddress')
  }

  get gender() {
    return this.customerForm?.get('gender')
  }

  get civilStatus() {
    return this.customerForm?.get('civilStatus')
  }

  submit(){
    this.customerForm.markAllAsTouched();
    console.log("Form submitted")
  }

}
