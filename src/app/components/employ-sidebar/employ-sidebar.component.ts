import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/employee/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/employee/customers', title: 'Customer',  icon:'person', class: '' },
    { path: '/employee/services', title: 'Service',  icon:'interests', class: '' },
    { path: '/employee/appointments', title: 'Appointment',  icon:'calendar_month', class: '' },
    { path: '/employee/payments', title: 'Payment',  icon:'payments', class: '' },
    { path: '/employee/profile', title: 'User Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-employ-sidebar',
  templateUrl: './employ-sidebar.component.html',
  styleUrls: ['./employ-sidebar.component.css']
})
export class EmploySidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
