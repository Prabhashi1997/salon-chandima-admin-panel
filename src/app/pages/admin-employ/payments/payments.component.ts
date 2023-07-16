import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import Swal from "sweetalert2";
import { Payment, PaymentService } from 'app/service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  payments: Payment[] = [];
  dataSource = new MatTableDataSource();
  search;
  filterValues: any = {};
  filterSelectObj: {
    name: string,
    columnProp: string,
    options: any[],
    select: boolean,
    modelValue?: any,
  }[] = [];
  displayedColumns: string[] = ['num', 'fullName','email','serviceName', 'payment', 'disable' ];

 
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private paymentService: PaymentService,
      private router: Router
    ) {
      this.getPayments();
      this.filterSelectObj = [
        {
          name: 'Service Name',
          columnProp: 'name',
          options: [],
          select: false,
        },
        {
          name: 'Customer Email',
          columnProp: 'email',
          options: [],
          select: false,
        },
      ]
    }


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPayments().subscribe((e) => {
      this.payments = e.payments;
      this.dataSource.data = this.payments;
      Swal.close();
    },async (error) => {
      await Swal.fire(
        'Error!',
        'Your process has been cancelled.',
        'error'
      );
    } );
  }
  add() {
    this.router.navigateByUrl('/admin/create-payment')
  }

  update(id: string) {
    this.router.navigateByUrl('/admin/edit-payment/'+id)
  }

  filterChange(filter:{ name: string, columnProp: string, options: any[] }, event: any) {
    this.filterValues[filter.columnProp] = event.target?.value.trim().toLowerCase() ?? event.trim().toLowerCase();
    this.search = event.target?.value.trim().toLowerCase() ?? event.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Get Unique values from columns to build filter
  getFilterObject(fullObj:any, key:any) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

    // Custom filter method for Angular Material Datatable
    createFilter() {
      let filterFunction = function (data: any, filter: string): boolean {
        let searchTerms = JSON.parse(filter);
        let isFilterSet = false;
        for (const col in searchTerms) {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        }
  
        console.log(searchTerms);
  
        let nameSearch = () => {
          let found = false;
          let found1 = true;
          if (isFilterSet) {
            for (const col in searchTerms) {
              searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true;
                } else {
                  found1 = false;
                }
              });
            }
            return found1
          } else {
            return true;
          }
        }
        return nameSearch()
      }
      return filterFunction
    }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

}
