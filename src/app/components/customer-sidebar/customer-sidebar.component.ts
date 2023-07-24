import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/customer', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/customer/appointment-details', title: 'Appointment',  icon:'calendar_month', class: '' },
    { path: '/customer/user-profile', title: 'Payment',  icon:'payments', class: '' },
    { path: '/customer/user-profile', title: 'Reviews',  icon:'reviews', class: '' },
    { path: '/customer/profile', title: 'User Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.css']
})
export class CustomerSidebarComponent implements OnInit {
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
