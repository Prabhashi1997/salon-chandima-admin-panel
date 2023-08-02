import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from 'environments/environment';

export interface Customer {
  id?: string;
  address: string;
  age: string;
  gender: string;
  contactNumber: string;
  doj: string;
  email: string;
  firstName: string;
  lastName: string;
  nic: string;
}

export interface CustomerCreationParams {
  name: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  baseUrl2 = `${environment.BASE_URL}customer`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  add(postData: any): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}`;
    const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  edit(postData: any, id: string): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}`;
    const data = this.http.patch(url,postData,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  delete(id) {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}`;
    const data = this.http.delete(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  getCustomer(id: string): Observable<{ data: Customer }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: Customer }>;
  }

  getCustomers(): Observable<{ data: Customer[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: Customer[], total: number }>;
  }

  getAllCustomers(): Observable<{ customers: {  id: number, name: string }[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/all`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ customers: {  id: number, name: string }[], total: number }>;
  }

  getCustomerbyUserId(): Observable<{ data: Customer }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/user`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: Customer }>;
  }

  disableCustomer(id: string): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}/disable`;
    const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  addReview(postData: any): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/reviw`;
    const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

}
