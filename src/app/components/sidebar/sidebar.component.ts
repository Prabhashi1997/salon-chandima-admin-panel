import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Admin',  icon:'person', class: '' },
    { path: '/table-list', title: 'Employee',  icon:'person', class: '' },
    { path: '/typography', title: 'Customer',  icon:'person', class: '' },
    { path: '/user-profile', title: 'Service',  icon:'interests', class: '' },
    { path: '/user-profile', title: 'Appointment',  icon:'calendar_month', class: '' },
    { path: '/user-profile', title: 'Payment',  icon:'payments', class: '' },
    { path: '/user-profile', title: 'Reviews',  icon:'reviews', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
