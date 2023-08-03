import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerApiService } from 'app/service/customer-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  [x: string]: any;

  reviewForm;
  isLoading = true;

  review = {
    comment: '',
    rate: ''
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: CustomerApiService,
  ) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      comment: new FormControl(this.review.comment, [Validators.required]),
      rate: new FormControl(this.review.rate, [Validators.required]),
    });
    this.isLoading = false;
  }


  get comment() {
    return this.reviewForm?.get('comment')
  }

  get rate() {
    return this.reviewForm?.get('rate')
  }

  submit(){
    this.reviewForm.markAllAsTouched();
    if(!this.reviewForm.invalid) {
        Swal.fire({
          title: 'Are you sure?',
          text: `Do You want add this review?`,
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
            this.reviewService.addReview(this.review).subscribe(
                async data => {
                  await Swal.fire({
                    title: 'Success!',
                    text: `You have successfully added.`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigateByUrl('/customer/dashboard');

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

}

