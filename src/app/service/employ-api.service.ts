import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from 'environments/environment';
import { CustomerMessage } from './customer-api.service';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  age: string;
  gender: string;
  dob: Date;
  contactNumber: string;
  doj: string;
  email: string;
  nic: string;
}

export interface EmployCreationParams {
  name: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})

export class EmployApiService {
  baseUrl2 = `${environment.BASE_URL}employee`
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

  getEmploy(id: string): Observable<{ data: User }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: User }>;
  }

  getEmployeebyUserId(): Observable<{ data: User }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/user`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: User }>;
  }

  getEmploys(): Observable<{ employees: User[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}`;
    const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ employees: User[], total: number }>;
  }

  disableEmploy(id: string): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl2}/${id}/disable`;
    const data = this.http.delete(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  // getAllMessages() {
  //   const token = localStorage.getItem('token');
  //   const url = `${this.baseUrl2}`;
  //   const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
  //   return data as Observable<{ messages: CustomerMessage[], total: number }>;
  // }

}