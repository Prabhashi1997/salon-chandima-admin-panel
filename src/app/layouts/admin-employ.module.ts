import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {ServiceEditComponent} from "../pages/admin-employ/service-edit/service-edit.component";
import {CustomersComponent} from "../pages/admin-employ/customers/customers.component";
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {CustomerEditComponent} from "../pages/admin-employ/customer-edit/customer-edit.component";

@NgModule({
  declarations: [
    ServiceEditComponent,
    CustomersComponent,
      CustomerEditComponent
  ],
  exports: [
    ServiceEditComponent,
    CustomersComponent,
      CustomerEditComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatTableModule,
        RouterLink,
        MatInputModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatRadioModule
    ]
})
export class AdminEmployModule { }
