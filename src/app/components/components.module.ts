import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmploySidebarComponent } from './employ-sidebar/employ-sidebar.component';
import {CustomerSidebarComponent} from "./customer-sidebar/customer-sidebar.component";
import {AdminSidebarComponent} from "./admin-sidebar/admin-sidebar.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    EmploySidebarComponent,
    CustomerSidebarComponent,
    AdminSidebarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    EmploySidebarComponent,
    CustomerSidebarComponent,
    AdminSidebarComponent,
  ]
})
export class ComponentsModule { }
