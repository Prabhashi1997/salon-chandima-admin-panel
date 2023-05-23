import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {

  serviceForm;
  isLoading = false;

  service = {
    serviceName: '',
    category: '',
    price: '',
    duration: '',
    description: '',
  }

  constructor() { }

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.isLoading = true;
  }

  get serviceName() {
    return this.serviceForm?.get('serviceName')
  }

  get category() {
    return this.serviceForm?.get('category')
  }

  get price() {
    return this.serviceForm?.get('price')
  }

  get duration() {
    return this.serviceForm?.get('duration')
  }

  get description() {
    return this.serviceForm?.get('address')
  }

  submit(){
    console.log("Form submitted")
  }

}
