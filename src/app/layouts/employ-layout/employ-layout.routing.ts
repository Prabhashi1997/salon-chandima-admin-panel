import { Routes } from '@angular/router';

import {DashboardComponent} from "../../pages/employ/dashboard/dashboard.component";
import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {UserProfileComponent} from "../../pages/employ/user-profile/user-profile.component";
import {CustomerEditComponent} from "../../pages/admin-employ/customer-edit/customer-edit.component";
import { CustomersComponent } from 'app/pages/admin-employ/customers/customers.component';
import { ServicesComponent } from 'app/pages/admin-employ/services/services.component';
import { PaymentsComponent } from 'app/pages/admin-employ/payments/payments.component';
import { AppointmentEditComponent } from 'app/pages/admin-employ/appointment-edit/appointment-edit.component';

export const EmployLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'customers',  component: CustomersComponent, canActivate: [AfterGuards], },
    { path: 'create-customer', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-customer/:id', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'services',  component: ServicesComponent, canActivate: [AfterGuards], },
    { path: 'create-service',  component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'edit-service/:id', component: ServiceEditComponent, canActivate: [AfterGuards],  },
    { path: 'payments',  component: PaymentsComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: UserProfileComponent, canActivate: [AfterGuards], },
    // { path: 'appoitments',  component: ServicesComponent, canActivate: [AfterGuards], },
    { path: 'create-appointment',  component: AppointmentEditComponent, canActivate: [AfterGuards], },
    { path: 'edit-appointment/:id', component: AppointmentEditComponent, canActivate: [AfterGuards],  },
];
