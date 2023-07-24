import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Admin, AdminService } from 'app/service/admin.service';
import Swal from 'sweetalert2';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('', style({ height: '', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminsComponent implements OnInit, AfterViewInit {
  admins: Admin[] = [];
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
  displayedColumns: string[] = ['num', 'fullName','email','mobile','disable' ];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private adminService: AdminService,
      private router: Router
  ) {
    this.getAdmins();
    this.filterSelectObj = [
      {
        name: 'Admin Name',
        columnProp: 'name',
        options: [],
        select: false,
      },
      {
        name: 'Admin Email',
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
    this.getAdmins();
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe((e) => {
      this.admins = e.admin;
      this.dataSource.data = this.admins;
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
    this.router.navigateByUrl('/admin/create-admin')
  }

  update(id: string) {
    this.router.navigateByUrl('/admin/edit-admin/'+id)
  }



  // Called on Filter change
  filterChange(filter:{ name: string, columnProp: string, options: any[] }, event: any) {
    //let filterValues = {}
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

  // Custom filter method fot Angular Material Datatable
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

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do You want delete this customer?`,
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
        this.adminService.delete(id).subscribe(
            async data => {
              await Swal.fire({
                title: 'Success!',
                text: `You have successfully deleted.`,
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              await this.getAdmins();

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