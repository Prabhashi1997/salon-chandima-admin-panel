import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/customer/dashboard/dashboard.component';
import {AppointmentDetailsComponent} from "../../pages/customer/appointment-details/appointment-details.component";
import {ManageAppointmentComponent} from "../../pages/customer/manage-appointment/manage-appointment.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {UserProfileComponent} from "../../pages/customer/user-profile/user-profile.component";
import { ReviewComponent } from 'app/pages/customer/review/review.component';

export const CustomerLayoutRoutes: Routes = [
    { path: '', redirectTo: 'appointments' },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AfterGuards],},
    { path: 'appointments', component: AppointmentDetailsComponent, canActivate: [AfterGuards],},
    { path: 'manage-appointment', component: ManageAppointmentComponent, canActivate: [AfterGuards],},
    { path: 'review', component: ReviewComponent, canActivate: [AfterGuards],},
    { path: 'profile', component: UserProfileComponent, canActivate: [AfterGuards],},
    {
        path: '**',
        redirectTo: 'appoitments',
      },
];
