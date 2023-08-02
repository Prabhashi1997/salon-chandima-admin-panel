import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerLayoutRoutes } from './customer-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DashboardComponent} from "../../pages/customer/dashboard/dashboard.component";
import {BookAppointmentComponent} from "../../pages/customer/book-appointment/book-appointment.component";
import {AppointmentDetailsComponent} from "../../pages/customer/appointment-details/appointment-details.component";
import {UserProfileComponent} from "../../pages/customer/user-profile/user-profile.component";
import {ManageAppointmentComponent} from "../../pages/customer/manage-appointment/manage-appointment.component";
import {PaymentComponent} from "../../pages/customer/payment/payment.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import { ReviewComponent } from 'app/pages/customer/review/review.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CustomerLayoutRoutes),
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
        FullCalendarModule,
    ],

  declarations: [
      DashboardComponent,
      BookAppointmentComponent,
      AppointmentDetailsComponent,
      UserProfileComponent,
      ManageAppointmentComponent,
      PaymentComponent,
      ReviewComponent,
  ]
})

export class CustomerLayoutModule {}
