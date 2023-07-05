import { Routes } from '@angular/router';
import {CustomerEditComponent} from "../../pages/admin/customer-edit/customer-edit.component";
import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {AdminEditComponent} from "../../pages/admin/admin-edit/admin-edit.component";
import {DashboardComponent} from "../../pages/admin/dashboard/dashboard.component";
import {UserProfileComponent} from "../../pages/admin/user-profile/user-profile.component";
import {EmployEditComponent} from "../../pages/admin/employ-edit/employ-edit.component";
import {AfterGuards} from "../../service/guards/after.guards";

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'employ-edit',  component: EmployEditComponent, canActivate: [AfterGuards], },
    { path: 'admin-edit',  component: AdminEditComponent, canActivate: [AfterGuards], },
    { path: 'service-edit',  component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'customer-edit',  component: CustomerEditComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: UserProfileComponent, canActivate: [AfterGuards], },
];
