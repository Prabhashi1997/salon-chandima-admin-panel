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

  isLoading = true;

  review = {
    comment: '',
    rate: 1
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: CustomerApiService,
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
    this.reviewService.getCustomerReview().subscribe((data) => {
      this.review = data.data;
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


  submit() {
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

