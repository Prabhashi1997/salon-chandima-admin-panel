import { Routes } from '@angular/router';
import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {AdminEditComponent} from "../../pages/admin/admin-edit/admin-edit.component";
import {DashboardComponent} from "../../pages/admin/dashboard/dashboard.component";
import {UserProfileComponent} from "../../pages/admin/user-profile/user-profile.component";
import {EmployEditComponent} from "../../pages/admin/employ-edit/employ-edit.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {CustomersComponent} from "../../pages/admin-employ/customers/customers.component";
import {CustomerEditComponent} from "../../pages/admin-employ/customer-edit/customer-edit.component";
import { AdminsComponent } from 'app/pages/admin/admins/admins.component';
import { EmploysComponent } from 'app/pages/admin/employs/employs.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'customers',  component: CustomersComponent, canActivate: [AfterGuards], },
    { path: 'admins',  component: AdminsComponent, canActivate: [AfterGuards], },
    { path: 'employees',  component: EmploysComponent, canActivate: [AfterGuards], },
    { path: 'employ-edit',  component: EmployEditComponent, canActivate: [AfterGuards], },
    { path: 'admin-edit',  component: AdminEditComponent, canActivate: [AfterGuards], },
    { path: 'service-edit',  component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: UserProfileComponent, canActivate: [AfterGuards], },
    { path: 'create-customer', component: CustomerEditComponent, canActivate: [AfterGuards],  },
    { path: 'edit-customer/:id', component: CustomerEditComponent, canActivate: [AfterGuards],  },
];
