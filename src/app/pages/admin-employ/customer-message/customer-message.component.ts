import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/service/admin.service';
import { CommonService } from 'app/service/common.service';
import { CustomerMessage } from 'app/service/customer-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-message',
  templateUrl: './customer-message.component.html',
  styleUrls: ['./customer-message.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerMessageComponent implements OnInit {
  messages: CustomerMessage[] = [];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['num', 'name','email','subject','message', 'disable'];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private customerService: AdminService,
    private adminService: CommonService,
  ) {
    this.getAllMessages();
    console.log(this.getAllMessages);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;   
  }

  getAllMessages() {
    this.customerService.getAllMessages().subscribe((e) => {
      this.messages = e.messages;
      this.dataSource.data = this.messages;
      Swal.close();
    },async (error) => {
      await Swal.fire(
        'Error!',
        'Your process has been cancelled.',
        'error'
      );
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do You want delete this message?`,
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
        this.adminService.deleteMessage(id).subscribe(
            async data => {
              await Swal.fire({
                title: 'Success!',
                text: `You have successfully deleted.`,
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              await this.getAllMessages()

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


