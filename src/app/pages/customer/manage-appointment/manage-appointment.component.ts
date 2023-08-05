import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Customer, CustomerApiService} from "../../../service/customer-api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {TokenService} from "../../../service/token.service";
import Swal from "sweetalert2";
import {AppointmentApiService} from "../../../service/appointment-api.service";

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageAppointmentComponent implements OnInit {
  appointments: any[] = [];
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
  displayedColumns: string[] = ['num', 'date','time','duration','advance','price','status', 'services' ];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private appointmentService: AppointmentApiService,
      private router: Router,
      private token: TokenService,
  ) {
    this.getAppointments();
    this.filterSelectObj = [
      {
        name: 'Date',
        columnProp: 'date',
        options: [],
        select: false,
      }
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
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getAll().subscribe((e) => {
      this.appointments = e.appointments;
      this.dataSource.data = this.appointments;
      Swal.close();
    },async (error) => {
      await Swal.fire(
          'Error!',
          'Your process has been cancelled.',
          'error'
      );
    } );
  }



  // Called on Filter change
  filterChange(filter:{ name: string, columnProp: string, options: any[] }, event: any) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target?.value.trim().toLowerCase() ?? event.trim().toLowerCase();
    this.search = event.target?.value.trim().toLowerCase() ?? event.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues)
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
