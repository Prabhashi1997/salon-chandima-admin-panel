import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES1: RouteInfo[] = [
    // { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/appointments', title: 'Appointment',  icon:'calendar_month', class: '' },
    { path: '/admin/manage-appointment', title: 'Booked Appointments',  icon:'payments', class: '' },
    { path: '/admin/services', title: 'Service',  icon:'interests', class: '' },
    { path: '/admin/customers', title: 'Customer',  icon:'person', class: '' },
    { path: '/admin/employees', title: 'Employee',  icon:'person', class: '' },
    { path: '/admin/admins', title: 'Admin',  icon:'person', class: '' },
    { path: '/admin/reviews-delete', title: 'Reviews',  icon:'reviews', class: '' },
    { path: '/admin/messages', title: 'Messages',  icon:'messages', class: '' },
    { path: '/admin/profile', title: 'User Profile',  icon:'person', class: '' },

];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES1.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
