import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployApiService } from 'app/service/employ-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employ-edit',
  templateUrl: './employ-edit.component.html',
  styleUrls: ['./employ-edit.component.scss']
})
export class EmployEditComponent implements OnInit {

  userForm;
  isLoading = false;
  edit= false;
  id;

  user: any = {
    firstName: '',
    lastName: '',
    nic: '',
    contactNumber: '',
    email:'',
    gender: '',
    designation: '',

    // designation: qb.designation,
    // gender: qb.gender,
    // contactNumber: qb.user.contactNumber,
    // doj: qb.user.doj,
    // email: qb.user.email,
    // firstName: qb.user.firstName,
    // lastName: qb.user.lastName,
    // nic: qb.user.nic,
  }

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployApiService,
    private router: Router,
  ) {}

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
    this.route.params.subscribe(params => {
          this.edit = !!params.id;
          if(!!params.id) {
            this.id = params.id;
            this.employeeService.getEmploy(this.id).subscribe((data) => {
              this.user = data.data;
                this.userForm = new FormGroup({
                  firstName: new FormControl('', [Validators.required]),
                  lastName: new FormControl('', [Validators.required]),
                  nic: new FormControl('', [Validators.required]),
                  contactNumber: new FormControl('', [Validators.required]),
                  email: new FormControl('', [Validators.required, Validators.email]),
                  gender: new FormControl('', [Validators.required]),
                  designation: new FormControl('', [Validators.required]),
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
              this.userForm = new FormGroup({
                firstName: new FormControl('', [Validators.required]),
                lastName: new FormControl('', [Validators.required]),
                nic: new FormControl('', [Validators.required]),
                contactNumber: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                gender: new FormControl('', [Validators.required]),
                designation: new FormControl('', [Validators.required]),
              });
              this.isLoading = false;
              Swal.close();
            } 
          });    
  }

  get firstName() {
    return this.userForm?.get('firstName')
  }

  get lastName() {
    return this.userForm?.get('lastName')
  }

  get nicNumber() {
    return this.userForm?.get('nic')
  }

  get contactNumber() {
    return this.userForm?.get('contactNumber')
  }

  get emailAddress() {
    return this.userForm?.get('email')
  }

  get gender() {
    return this.userForm?.get('gender')
  }

  get designation() {
    return this.userForm?.get('designation')
  }

  submit(){
    this.userForm.markAllAsTouched();
    if(!this.userForm.invalid) {
      if(this.edit) {

        Swal.fire({
          title: 'Are you sure?',
          text: `Do You want edit this employee?`,
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
            delete this.user.doj
            this.employeeService.
            edit(this.user, this.id).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully edited.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigateByUrl('/admin/employs');

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
          text: `Do You want add this employee?`,
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
            this.employeeService.add(this.user).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully added.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  // this.router.navigateByUrl('/customers');
                  this.router.navigateByUrl('/admin/employs');

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
