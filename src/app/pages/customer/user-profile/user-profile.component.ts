import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerApiService } from 'app/service/customer-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm;
  isLoading = true;
  edit = false;
  id;

  profile = {
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
    private customerApiService: CustomerApiService,
    private route: ActivatedRoute,
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
    this.customerApiService.getCustomerbyUserId().subscribe((data) => {
      this.profile = data.data;
      this.id = data.data.id;
      this.profileForm = new FormGroup({
                firstName: new FormControl(this.profile.firstName, [Validators.required]),
                lastName: new FormControl(this.profile.lastName, [Validators.required]),
                nic: new FormControl({ value: this.profile.nic, disabled: true }, [Validators.required]),
                age: new FormControl(this.profile.age, [Validators.required]),
                address: new FormControl(this.profile.address, [Validators.required]),
                contactNumber: new FormControl(this.profile.contactNumber, [Validators.required]),
                email: new FormControl({ value: this.profile.email, disabled: true },[Validators.required, Validators.email]),
                gender: new FormControl(this.profile.gender,[Validators.required]),
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
  }

  get firstName() {
    return this.profileForm?.get('firstName')
  }

  get lastName() {
    return this.profileForm?.get('lastName')
  }

  get nicNumber() {
    return this.profileForm?.get('nic')
  }

  get age() {
    return this.profileForm?.get('age')
  }

  get address() {
    return this.profileForm?.get('address')
  }

  get contactNumber() {
    return this.profileForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.profileForm?.get('email')
  }

  get gender() {
    return this.profileForm?.get('gender')
  }

  async submit() {
    this.profileForm.markAllAsTouched();
    if(!this.profileForm.invalid){
      Swal.fire({
        title: 'Are you sure?',
        text: `Do You want edit your profile`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4250ce',
        cancelButtonColor: '#dc3545',
        confirmButtonText: `Yes, edit it`,
      }).then(async (result) => {
        if(result.isConfirmed) {
          Swal.fire({
            title: 'Processing!',
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: () => !Swal.isLoading()
          });
          this.customerApiService.edit(this.profile, this.id)
            .subscribe(
              async data => {
                await Swal.fire({
                  title: 'Success!',
                  text: `You have successfully edited.`,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });

              }, async error => {
                await Swal.fire(
                    'Error!',
                    error?.error?.message ?? 'Your process has been cancelled.',
                    'error'
                );

              }
          )
        }
      })
      } 
      console.log("Form submitted", !this.profileForm.invalid)
    }   
}
