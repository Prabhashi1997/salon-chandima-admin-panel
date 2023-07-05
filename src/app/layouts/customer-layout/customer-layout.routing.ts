import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/customer/dashboard/dashboard.component';
import {BookAppointmentComponent} from "../../pages/customer/book-appointment/book-appointment.component";
import {AppointmentDetailsComponent} from "../../pages/customer/appointment-details/appointment-details.component";
import {ManageAppointmentComponent} from "../../pages/customer/manage-appointment/manage-appointment.component";
import {PaymentComponent} from "../../pages/customer/payment/payment.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {UserProfileComponent} from "../../pages/customer/user-profile/user-profile.component";

export const CustomerLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AfterGuards],},
    { path: 'book-appointment', component: BookAppointmentComponent, canActivate: [AfterGuards],},
    { path: 'appointment-details', component: AppointmentDetailsComponent, canActivate: [AfterGuards],},
    { path: 'manage-appointment', component: ManageAppointmentComponent, canActivate: [AfterGuards],},
    { path: 'payment', component: PaymentComponent, canActivate: [AfterGuards],},
    { path: 'profile', component: UserProfileComponent, canActivate: [AfterGuards],},
];
