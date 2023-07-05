import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {ServiceEditComponent} from "../pages/admin-employ/service-edit/service-edit.component";
import {CustomerEditComponent} from "../pages/admin/customer-edit/customer-edit.component";

@NgModule({
  declarations: [
    ServiceEditComponent,
    CustomerEditComponent,
  ],
  exports: [
    ServiceEditComponent,
    CustomerEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AdminEmployModule { }
