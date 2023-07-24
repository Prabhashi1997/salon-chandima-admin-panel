import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from 'environments/environment'

export interface Appointment{
    id?: number;
    date: Date;
    time: number;
}

@Injectable({
    providedIn: 'root'
  })

export class AppointmentApiService {
    baseUrl2 = `${environment.BASE_URL}appointment`;
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

    addAppointment(postData: any): Observable<{ message: string, body?: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}`;
        const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
    }

    editAppointment(postData: any, id: string): Observable<{ message: string, body?: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}`;
        const data = this.http.patch(url,postData,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
    }
    
    getAppointment(id: string): Observable<{ data: Appointment }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ data: Appointment }>;
    } 
    
    deleteAppointment(id) {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}`;
        const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
    }

    disableAppointment(id: string): Observable<{ message: string, body?: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}/disable`;
        const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
      }

  }