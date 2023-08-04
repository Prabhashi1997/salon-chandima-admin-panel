import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployApiService } from 'app/service/employ-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './employee-user-profile.component.html',
  styleUrls: ['./employee-user-profile.component.scss']
})
export class EmployeeUserProfileComponent implements OnInit {

  profileForm;
  isLoading = true;
  edit = false;
  id;

  profile: any = {
    firstName: '',
    lastName: '',
    nic: '',
    contactNumber: '',
    email:'',
    gender: '',
    designation: '',
  }

  constructor(
    private employApiService: EmployApiService,
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
    this.employApiService.getEmployeebyUserId().subscribe((data) => {
      this.profile = data.data;
      this.id = data.data.id;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.profile.firstName, [Validators.required]),
        lastName: new FormControl(this.profile.lastName,[Validators.required]),
        nic: new FormControl({ value: this.profile.nic, disabled: true }, [Validators.required]),
        contactNumber: new FormControl(this.profile.contactNumber, [Validators.required]),
        email: new FormControl({ value: this.profile.email, disabled: true }, [Validators.required, Validators.email]),
        gender: new FormControl(this.profile.gender,[Validators.required]),
        designation: new FormControl(this.profile.designation,[Validators.required]),
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

  get contactNumber() {
    return this.profileForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.profileForm?.get('email')
  }

  get gender() {
    return this.profileForm?.get('gender')
  }

  get designation() {
    return this.profileForm?.get('designation')
  }

  submit() {
    this.profileForm.markAllAsTouched();
    if(!this.profileForm.invalid){
      Swal.fire({
        title: 'Are you sure?',
        text: `Do You want edit this customer?`,
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
          }).then(() =>{
          });
          // @ts-ignore
          delete this.user.doj
          this.employApiService.edit(this.profile, this.id)
          .subscribe(
              async data => {
                await Swal.fire({
                  title: 'Success!',
                  text: `You have successfully edited.`,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.router.navigateByUrl('/employee/dashboard');

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
      this.router.navigateByUrl('/employee/dashboard');
      }
      console.log("Form submitted", !this.profileForm.invalid)
    }
}
