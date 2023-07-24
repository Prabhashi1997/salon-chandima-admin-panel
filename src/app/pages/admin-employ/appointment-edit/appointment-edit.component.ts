import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  appointmentForm;
  isLoading = true;

  appointment = {
    customerName: '',
    serviceName: '',
    date: '',
    time: '',
  }
  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.appointmentForm = new FormGroup({
      customerName: new FormControl(this.appointment.customerName, [Validators.required]),
      serviceName: new FormControl(this.appointment.serviceName, [Validators.required]),
      date: new FormControl(this.appointment.date, [Validators.required]),
      time: new FormControl(this.appointment.time, [Validators.required]),
    })

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
