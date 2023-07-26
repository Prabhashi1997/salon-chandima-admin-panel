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
    customerName: '',
    serviceName: '',
    date: '',
    time: '',
  }
  constructor(
    private customerService: CustomerApiService,
    private serviceService: ServiceApiService,
  ) { 
    this.loadData()
  }


  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      customerName: new FormControl(this.appointment.customerName, [Validators.required]),
      serviceName: new FormControl(this.appointment.serviceName, [Validators.required]),
      date: new FormControl(this.appointment.date, [Validators.required]),
      time: new FormControl(this.appointment.time, [Validators.required]),
    });
    this.isLoading = false;
  }

  loadData() {
    this.customerService.getAllCustomers().subscribe((e) => {
      this.customers = e.customers;
      console.log(this.customers)
    });

    this.serviceService.getAllServices().subscribe((e) => {
      this.services = e.services;
      console.log(this.services);
    });
  }

  get customerName() {
    return this.appointmentForm?.get('customerName')
  }

  get serviceName() {
    return this.appointmentForm?.get('serviceName')
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
