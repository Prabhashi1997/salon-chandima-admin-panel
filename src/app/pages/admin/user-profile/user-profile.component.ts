import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'app/service/admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { dA } from '@fullcalendar/core/internal-common';
import { UserService } from 'app/service/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef | undefined;

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
  }

  password= {
    password: '',
    rePassword: ''
  }

  constructor(
    private adminService: AdminService,
    private userService: UserService,
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
    this.adminService.getAdminbyUserId().subscribe((data) => {
      this.profile = data.data;
      this.id = data.data.id;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.profile.firstName, [Validators.required]),
        lastName: new FormControl(this.profile.lastName, [Validators.required]),
        nic: new FormControl({ value: this.profile.nic, disabled: true }, [Validators.required]),
        contactNumber: new FormControl(this.profile.contactNumber, [Validators.required]),
        email: new FormControl({ value: this.profile.email, disabled: true }, [Validators.required, Validators.email]),
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

  submit() {
    this.profileForm.markAllAsTouched();
    if(!this.profileForm.invalid){
      Swal.fire({
        title: 'Are you sure?',
        text: `Do You want edit your profile?`,
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
          })
          this.adminService.edit(this.profile, this.id)
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

    async updatePassword() {
      await Swal.fire({
        titleText: 'Edit Password',
        showCancelButton: true,
        confirmButtonText: 'Save',
        html: this.modal?.nativeElement,
        showLoaderOnConfirm: true,
        preConfirm: async (r) => {
          if (this.password.password === '' ||  this.password.rePassword === '') {
            Swal.showValidationMessage('Form is not completed');
          } else if(this.password.password === '' ||  this.password.rePassword === '') {
            Swal.showValidationMessage('Password not matched');
          } else {
            Swal.fire({
              title: 'Are you sure?',
              text: `Password will be Updated`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, Updated it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true,
              preConfirm: (login) => {
                delete this.password.rePassword;
                this.userService.passwordChange(this.password).subscribe((data) => {
                })

              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Password was not Updated',
                    'error'
                )
              } else {
                Swal.fire(
                    'Updated!',
                    'Password has been Updated.',
                    'success'
                )
              }
            });
          }
        },
      })
    }
  }
