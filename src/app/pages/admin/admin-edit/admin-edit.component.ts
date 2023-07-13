import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'app/service/admin.service';
import { data, param } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})

export class AdminEditComponent implements OnInit {

  adminForm;
  isLoading = true;
  edit = false;
  id;

  admin:any = {
    firstName: '',
    lastName: '',
    nic: '',
    contactNumber: '',
    email:'',
  }

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params =>{
      this.edit = !!params.id;
      if(!!params.id) {
        this.id = params.id;
        this.adminService.getAdmin(this.id).subscribe((data) => {
          this.admin = data.data;
          this.adminForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            nic: new FormControl('', [Validators.required]),
            contactNumber: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
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
        this.adminForm = new FormGroup({
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
          nic: new FormControl('', [Validators.required]),
          contactNumber: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email]),
        });
        this.isLoading = false;
        Swal.close();
      }
    });
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
    if(!this.adminForm.invalid){
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
            delete this.admin.doj
            this.adminService.
            edit(this.admin, this.id).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully edited.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigateByUrl('/admin/admins');

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
        })
      }
    }
    console.log("Form submitted")
  }

}
