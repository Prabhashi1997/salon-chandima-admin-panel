import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerApiService} from "../../service/customer-api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;
  isLoading = false;

  register = {
    firstName: '',
    lastName: '',
    nic: '',
    age: '',
    address: '',
    contactNumber: '',
    email:'',
    gender: '',
    password: '',
    passwordAgain: '',
  }

  constructor(
      private router: Router,
      private customerService: CustomerApiService,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(this.register.firstName, [Validators.required]),
      lastName: new FormControl(this.register.lastName, [Validators.required]),
      nic: new FormControl(this.register.nic, [Validators.required]),
      age: new FormControl(this.register.age, [Validators.required]),
      address: new FormControl(this.register.address, [Validators.required]),
      contactNumber: new FormControl(this.register.contactNumber, [Validators.required]),
      email: new FormControl(this.register.email,[Validators.required, Validators.email]),
      gender: new FormControl(this.register.gender,[Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordAgain: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get firstName() {
    return this.registerForm?.get('firstName')
  }

  get lastName() {
    return this.registerForm?.get('lastName')
  }

  get nicNumber() {
    return this.registerForm?.get('nic')
  }

  get age() {
    return this.registerForm?.get('age')
  }

  get address() {
    return this.registerForm?.get('address')
  }

  get contactNumber() {
    return this.registerForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.registerForm?.get('email')
  }

  get gender() {
    return this.registerForm?.get('gender')
  }

  get password() {
    return this.registerForm?.get('password')
  }

  get passwordAgain() {
    return this.registerForm?.get('passwordAgain')
  }

  async submit() {
    this.registerForm.markAllAsTouched();

    if (!this.registerForm.invalid && this.register.password === this.register.passwordAgain) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do You want register as customer?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4250ce',
        cancelButtonColor: '#dc3545',
        confirmButtonText: `Yes`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Processing!',
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then(() => {
          });
          delete this.register.passwordAgain;
          this.customerService.register(this.register).subscribe(
              async data => {
                await Swal.fire({
                  title: 'Success!',
                  text: `You have successfully registered.`,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                // this.router.navigateByUrl('/customers');
                this.router.navigateByUrl('/login');

              }, async error => {
                await Swal.fire(
                    'Error!',
                    error?.error?.message ?? 'Your process has been cancelled.',
                    'error'
                );

              }
          )
        }
      });
    } else if (this.register.password !== this.register.passwordAgain) {
      await Swal.fire(
          'Error!',
          'Your password not matched.',
          'error'
      );
    }
  }
}