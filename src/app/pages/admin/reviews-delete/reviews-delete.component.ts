import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService, Review } from 'app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews-delete',
  templateUrl: './reviews-delete.component.html',
  styleUrls: ['./reviews-delete.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('', style({ height: '', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReviewsDeleteComponent implements OnInit {
  reviews: Review[] =[]
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['num','fullname','comment','rate','disable' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reviewService: AdminService,
  ) { 
    this.getReview();
    console.log(this.getReview);
  }

  ngOnInit(): void {
  }

  getReview() {
    this.reviewService.getReview().subscribe((e) => {
      this.reviews = e.reviews;
      this.dataSource.data = this.reviews;
      Swal.close();
    },async (error) => {
      await Swal.fire(
        'Error!',
        'Your process has been cancelled.',
        'error'
      );
    } );
  }

  deleteReview(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do You want delete this review?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#4250ce',
      confirmButtonText: `Yes, delete it`,
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
        this.reviewService.deleteReview(id).subscribe(
            async data => {
              await Swal.fire({
                title: 'Success!',
                text: `You have successfully deleted.`,
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              await this.getReview();

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
