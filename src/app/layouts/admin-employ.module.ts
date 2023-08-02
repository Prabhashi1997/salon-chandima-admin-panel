import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {ServiceEditComponent} from "../pages/admin-employ/service-edit/service-edit.component";
import {CustomersComponent} from "../pages/admin-employ/customers/customers.component";
import {MatTableModule} from "@angular/material/table";
import {RouterLink, RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {CustomerEditComponent} from "../pages/admin-employ/customer-edit/customer-edit.component";
import {ServicesComponent} from "../pages/admin-employ/services/services.component";
import {PaymentsComponent} from "../pages/admin-employ/payments/payments.component";
import { AdminLayoutRoutes } from './admin-layout/admin-layout.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {AppointmentEditComponent} from "../pages/admin-employ/appointment-edit/appointment-edit.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomerMessageComponent } from 'app/pages/admin-employ/customer-message/customer-message.component';

@NgModule({
  declarations: [
      ServiceEditComponent,
      ServicesComponent,
      CustomersComponent,
      CustomerEditComponent,
      PaymentsComponent,
      AppointmentEditComponent,
      CustomerMessageComponent,
  ],
  exports: [
      ServicesComponent,
      ServiceEditComponent,
      CustomersComponent,
      CustomerEditComponent,
      PaymentsComponent,
      AppointmentEditComponent,
      CustomerMessageComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        MatCardModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatTableModule,
        RouterLink,
        MatInputModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatPaginatorModule,
        NgSelectModule,
    ]
})
export class AdminEmployModule { }
