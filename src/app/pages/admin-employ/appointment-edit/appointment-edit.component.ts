import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer, CustomerApiService } from 'app/service/customer-api.service';
import { Service, ServiceApiService } from 'app/service/service-api.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {
  customers: Customer[] = [];
  services: Service[] = [];
  
  appointmentForm;
  isLoading = true;

  appointment = {
    customer: undefined,
    service: '',
    date: '',
    time: '',
  }
  constructor(
    private customerService: CustomerApiService,
    private serviceService: ServiceApiService,
  ) { 
  }


  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      customer: new FormControl(this.appointment.customer, [Validators.required]),
      service: new FormControl(this.appointment.service, [Validators.required]),
      date: new FormControl(this.appointment.date, [Validators.required]),
      time: new FormControl(this.appointment.time, [Validators.required]),
    });
    this.loadData();
    this.isLoading = false;
  }

  loadData() {
    this.customerService.getAllCustomers().subscribe((e) => {
      this.customers = e.customers;
    });

    this.serviceService.getAllServices().subscribe((e) => {
      this.services = e.services;
    });
  }

  get customer() {
    return this.appointmentForm?.get('customer')
  }

  get service() {
    return this.appointmentForm?.get('service')
  }

  get date() {
    return this.appointmentForm?.get('date')
  }

  get time() {
    return this.appointmentForm?.get('time')
  }

  submit() {

  }
}
