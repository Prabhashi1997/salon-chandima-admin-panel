import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {CustomerLayoutComponent} from "./layouts/customer-layout/customer-layout.component";
import {EmployLayoutComponent} from "./layouts/employ-layout/employ-layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {BeforeGuards} from "./service/guards/before.guards";
import {AfterGuards} from "./service/guards/after.guards";
import {AdminGuard} from "./service/guards/admin.guards";
import {CustomerGuards} from "./service/guards/customer.guards";
import {EmployGuards} from "./service/guards/employ.guards";

const routes: Routes =[
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeGuards],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [BeforeGuards],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }],
    canActivate: [AfterGuards,AdminGuard],
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/customer-layout/customer-layout.module').then(m => m.CustomerLayoutModule)
    }],
    canActivate: [AfterGuards,CustomerGuards],
  },
  {
    path: 'employ',
    component: EmployLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/employ-layout/employ-layout.module').then(m => m.EmployLayoutModule)
    }],
    canActivate: [AfterGuards,EmployGuards],
  },
  {
    path: '**',
    redirectTo: '/',
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
