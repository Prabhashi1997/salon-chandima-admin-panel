import { Routes } from '@angular/router';

import {DashboardComponent} from "../../pages/employ/dashboard/dashboard.component";
import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {EmployeeUserProfileComponent} from "../../pages/employ/user-profile/employee-user-profile.component";
import {CustomerEditComponent} from "../../pages/admin-employ/customer-edit/customer-edit.component";
import { CustomersComponent } from 'app/pages/admin-employ/customers/customers.component';
import { ServicesComponent } from 'app/pages/admin-employ/services/services.component';
import { PaymentsComponent } from 'app/pages/admin-employ/payments/payments.component';
import { AppointmentEditComponent } from 'app/pages/admin-employ/appointment-edit/appointment-edit.component';
import {AppointmentDetailsComponent} from "../../pages/admin-employ/appointment-details/appointment-details.component";
import {ManageAppointmentComponent} from "../../pages/admin-employ/manage-appointment/manage-appointment.component";
import { CustomerMessageComponent } from 'app/pages/admin-employ/customer-message/customer-message.component';

export const EmployLayoutRoutes: Routes = [
    { path: '', redirectTo: 'appoitments' },
    // { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'customers',  component: CustomersComponent, canActivate: [AfterGuards], },
    { path: 'create-customer', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-customer/:id', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'services',  component: ServicesComponent, canActivate: [AfterGuards], },
    { path: 'create-service',  component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'edit-service/:id', component: ServiceEditComponent, canActivate: [AfterGuards],  },
    { path: 'payments',  component: PaymentsComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: EmployeeUserProfileComponent, canActivate: [AfterGuards], },
    { path: 'appointments',  component: AppointmentDetailsComponent, canActivate: [AfterGuards], },
    { path: 'manage-appointment', component: ManageAppointmentComponent, canActivate: [AfterGuards],},
    { path: 'messages',  component: CustomerMessageComponent, canActivate: [AfterGuards], },

    {
        path: '**',
        redirectTo: 'appoitments',
      },
];
