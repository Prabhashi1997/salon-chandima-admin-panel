import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceApiService } from 'app/service/service-api.service';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

// interface Service {
//   id: string;
//   value: string;
// }

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {

  // hide = true;

  serviceForm;
  isLoading = true;
  edit= false;
  id;

  service: any = {
    name: '',
    // category: '',
    price: '',
    duration: '',
    description: '',
    employeeName: '',
  }

  // services: Service[] = [
  //   {id: '0', value: 'Hair Chemical Services'},
  //   {id: '1', value: 'Hair Cuts'},
  //   {id: '2', value: 'Skin Care'},
  //   {id: '3', value: 'Waxing'},
  //   {id: '4', value: 'Bridal Dressing'},
  //   {id: '5', value: 'Normal Dressing'},
  //   {id: '6', value: 'Other'},
  // ];

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceApiService,
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
            this.serviceService.getService(this.id).subscribe((data) => {
              console.log(data);
              this.service = data.data;
              this.serviceForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                // category: new FormControl('', [Validators.required]),
                price: new FormControl('', [Validators.required]),
                duration: new FormControl('', [Validators.required]),
                description: new FormControl(''),
                employeeName: new FormControl(''),
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
            this.serviceForm = new FormGroup({
              name: new FormControl('', [Validators.required]),
              // category: new FormControl('', [Validators.required]),
              price: new FormControl('', [Validators.required]),
              duration: new FormControl('', [Validators.required]),
              description: new FormControl(''),
              employeeName: new FormControl(''),
            });
            this.isLoading = false;
            Swal.close();
          }
        });
  }

  get serviceName() {
    return this.serviceForm?.get('name')
  }

  // get category() {
  //   return this.serviceForm?.get('category')
  // }

  get price() {
    return this.serviceForm?.get('price')
  }

  get duration() {
    return this.serviceForm?.get('duration')
  }

  get description() {
    return this.serviceForm?.get('description')
  }

  get employeeName() {
    return this.serviceForm?.get('employeeName')
  }

  submit(){
    this.serviceForm.markAllAsTouched();
    console.log(this.service);
    // if(!this.serviceForm.invalid) {
    //   if(this.edit) {

    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: `Do You want edit this service?`,
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#4250ce',
    //       cancelButtonColor: '#dc3545',
    //       confirmButtonText: `Yes, edit it`,
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire({
    //           title: 'Processing!',
    //           didOpen: () => {
    //             Swal.showLoading();
    //           },
    //           allowOutsideClick: () => !Swal.isLoading()
    //         }).then(() => {
    //         });
    //         // @ts-ignore
    //         delete this.service.doj;
    //         console.log(this.service);
    //         this.serviceService.
    //         edit(this.service, this.id).subscribe(
    //             async data => {
    //               await Swal.fire({
    //                 title: 'Success!',
    //                 text: `You have successfully edited.`,
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok'
    //               });
    //               this.router.navigateByUrl('/admin/services');

    //             }, async error => {
    //               console.log(error)
    //               await Swal.fire(
    //                   'Error!',
    //                   'Your process has been cancelled.',
    //                   'error'
    //               );

    //             }
    //         )
    //       }
    //     });
    //   } else {
    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: `Do You want add this service?`,
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#4250ce',
    //       cancelButtonColor: '#dc3545',
    //       confirmButtonText: `Yes, add it`,
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire({
    //           title: 'Processing!',
    //           didOpen: () => {
    //             Swal.showLoading();
    //           },
    //           allowOutsideClick: () => !Swal.isLoading()
    //         }).then(() => {
    //         });
    //         this.serviceService.add(this.service).subscribe(
    //             async data => {
    //               await Swal.fire({
    //                 title: 'Success!',
    //                 text: `You have successfully added.`,
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok'
    //               });
    //               this.router.navigateByUrl('/admin/services');

    //             }, async error => {
    //               console.log(error)
    //               await Swal.fire(
    //                   'Error!',
    //                   'Your process has been cancelled.',
    //                   'error'
    //               );

    //             }
    //         )
    //       }
    //     });
    //   }
    // }
    console.log("Form submitted")
  }

}
