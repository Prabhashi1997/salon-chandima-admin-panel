import { Routes } from '@angular/router';
import {AfterGuards} from "../../service/guards/after.guards";

import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {AdminEditComponent} from "../../pages/admin/admin-edit/admin-edit.component";
import {DashboardComponent} from "../../pages/admin/dashboard/dashboard.component";
import {UserProfileComponent} from "../../pages/admin/user-profile/user-profile.component";
import {EmployEditComponent} from "../../pages/admin/employ-edit/employ-edit.component";
import {CustomersComponent} from "../../pages/admin-employ/customers/customers.component";
import {CustomerEditComponent} from "../../pages/admin-employ/customer-edit/customer-edit.component";
import { AdminsComponent } from 'app/pages/admin/admins/admins.component';
import { EmploysComponent } from 'app/pages/admin/employs/employs.component';
import {ServicesComponent} from "../../pages/admin-employ/services/services.component";
import {PaymentsComponent} from "../../pages/admin-employ/payments/payments.component";
import { CustomerMessageComponent } from 'app/pages/admin-employ/customer-message/customer-message.component';
import { ReviewsDeleteComponent } from 'app/pages/admin/reviews-delete/reviews-delete.component';
import {AppointmentDetailsComponent} from "../../pages/admin-employ/appointment-details/appointment-details.component";
import {ManageAppointmentComponent} from "../../pages/admin-employ/manage-appointment/manage-appointment.component";


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'appointments' },
    // { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'customers',  component: CustomersComponent, canActivate: [AfterGuards], },
    { path: 'create-customer', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-customer/:id', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'admins',  component: AdminsComponent, canActivate: [AfterGuards], },
    { path: 'create-admin', component: AdminEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-admin/:id', component: AdminEditComponent, canActivate: [AfterGuards],  },
    { path: 'employees',  component: EmploysComponent, canActivate: [AfterGuards], },
    { path: 'create-employee', component: EmployEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-employee/:id', component: EmployEditComponent, canActivate: [AfterGuards],  },
    { path: 'services',  component: ServicesComponent, canActivate: [AfterGuards], },
    { path: 'create-service',  component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'edit-service/:id', component: ServiceEditComponent, canActivate: [AfterGuards],  },
    { path: 'payments',  component: PaymentsComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: UserProfileComponent, canActivate: [AfterGuards], },
    { path: 'appointments',  component: AppointmentDetailsComponent, canActivate: [AfterGuards], },
    { path: 'manage-appointment', component: ManageAppointmentComponent, canActivate: [AfterGuards],},
    { path: 'messages',  component: CustomerMessageComponent, canActivate: [AfterGuards], },
    { path: 'reviews-delete',  component: ReviewsDeleteComponent, canActivate: [AfterGuards], },
    {
        path: '**',
        redirectTo: 'appoitments',
      },

];
