import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    addAppointment(postData: any): Observable<any> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}`;
        const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<any>;
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

    getAll(): Observable<{ appointments: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/all`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ appointments: any }>;
    }

    get(): Observable<{ appointments: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ appointments: any }>;
    }

    getCalenderAll(): Observable<{ appointments: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/calender/all`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ appointments: any }>;
    }

    getCalender(): Observable<{ appointments: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/calender`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ appointments: any }>;
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
