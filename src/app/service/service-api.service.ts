import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from 'environments/environment';

export interface Service {
    id?: number;
    name: string;
    description?: string;
    image?: string;
    price: number;
    duration: number;
    // category?: string;
    employeeName?: string;
}

@Injectable({
    providedIn: 'root'
  })
  export class ServiceApiService {
    baseUrl2 = `${environment.BASE_URL}service`;
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
    
      getService(id: string): Observable<{ data: Service }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ data: Service }>;
      }
    
      getServices(): Observable<{ services: Service[], total: number}> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}`;
        const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ services: Service[], total: number }>;
      }
    
      disableService(id: string): Observable<{ message: string, body?: any }> {
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}/disable`;
        const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
      }

      delete(id){
        const token = localStorage.getItem('token');
        const url = `${this.baseUrl2}/${id}`;
        const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
        return data as Observable<{ message: string, body?: any }>;
      }

  }