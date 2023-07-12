import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {CustomerApiService} from "../../../service/customer-api.service";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm;
  isLoading = true;
  edit= false;
  id;

  customer = {
    firstName: '',
    lastName: '',
    nic: '',
    age: '',
    address: '',
    contactNumber: '',
    email:'',
    gender: '',
  }

  constructor(
      private route: ActivatedRoute,
      private customerService: CustomerApiService,
      private router: Router,
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
    Swal.fire({
      title: 'Processing!',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(() => {
    });
    this.route.params
        .subscribe(params => {
          this.edit = !!params.id;
          if(!!params.id) {
            this.id = params.id;
            this.customerService.getCustomer(this.id).subscribe((data) => {
              this.customer = data.data;
              this.customerForm = new FormGroup({
                firstName: new FormControl(data.data.firstName, [Validators.required]),
                lastName: new FormControl(data.data.lastName, [Validators.required]),
                nic: new FormControl({ value: data.data.nic, disabled: true }, [Validators.required]),
                age: new FormControl(data.data.age, [Validators.required]),
                address: new FormControl(data.data.address, [Validators.required]),
                contactNumber: new FormControl(data.data.contactNumber, [Validators.required]),
                email: new FormControl({ value: data.data.email, disabled: true },[Validators.required, Validators.email]),
                gender: new FormControl(data.data.gender,[Validators.required]),
              });
              this.isLoading = false;
              Swal.close();
            },async error => {
              console.log(error)
              await Swal.fire(
                  'Error!',
                  'Your process has been cancelled.',
                  'error'
              );
            })
          } else {
            this.customerForm = new FormGroup({
              firstName: new FormControl('', [Validators.required]),
              lastName: new FormControl('', [Validators.required]),
              nic: new FormControl('', [Validators.required]),
              age: new FormControl('', [Validators.required]),
              address: new FormControl('', [Validators.required]),
              contactNumber: new FormControl('', [Validators.required]),
              email: new FormControl('', [Validators.required, Validators.email]),
              gender: new FormControl('', [Validators.required]),
            });
            this.isLoading = false;
            Swal.close();
          }
        });
  }

  get firstName() {
    return this.customerForm?.get('firstName')
  }

  get lastName() {
    return this.customerForm?.get('lastName')
  }

  get nicNumber() {
    return this.customerForm?.get('nic')
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
    return this.customerForm?.get('email')
  }

  get gender() {
    return this.customerForm?.get('gender')
  }

  submit(){
    this.customerForm.markAllAsTouched();
    if(!this.customerForm.invalid) {
      if(this.edit) {

        Swal.fire({
          title: 'Are you sure?',
          text: `Do You want edit this customer?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4250ce',
          cancelButtonColor: '#dc3545',
          confirmButtonText: `Yes, edit it`,
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
            // @ts-ignore
            delete this.customer.doj
            this.customerService.
            edit(this.customer, this.id).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully edited.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigateByUrl('/admin/customers');

                }, async error => {
                  console.log(error)
                  await Swal.fire(
                      'Error!',
                      'Your process has been cancelled.',
                      'error'
                  );

                }
            )
          }
        });
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: `Do You want add this customer?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4250ce',
          cancelButtonColor: '#dc3545',
          confirmButtonText: `Yes, add it`,
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
            this.customerService.add(this.customer).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully added.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  // this.router.navigateByUrl('/customers');
                  this.router.navigateByUrl('/admin/customers');

                }, async error => {
                  console.log(error)
                  await Swal.fire(
                      'Error!',
                      'Your process has been cancelled.',
                      'error'
                  );

                }
            )
          }
        });
      }
    }
    console.log("Form submitted")
  }

}
