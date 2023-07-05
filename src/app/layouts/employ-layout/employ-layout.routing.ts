import { Routes } from '@angular/router';

import {DashboardComponent} from "../../pages/employ/dashboard/dashboard.component";
import {ServiceEditComponent} from "../../pages/admin-employ/service-edit/service-edit.component";
import {CustomerEditComponent} from "../../pages/admin/customer-edit/customer-edit.component";
import {AfterGuards} from "../../service/guards/after.guards";
import {UserProfileComponent} from "../../pages/employ/user-profile/user-profile.component";

export const EmployLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AfterGuards], },
    { path: 'service-edit', component: ServiceEditComponent, canActivate: [AfterGuards], },
    { path: 'customer-edit', component: CustomerEditComponent, canActivate: [AfterGuards], },
    { path: 'profile',   component: UserProfileComponent, canActivate: [AfterGuards], },
];
