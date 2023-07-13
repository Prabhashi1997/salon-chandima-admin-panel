import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TokenService } from './token.service';
import { Observable, throwError } from 'rxjs';

export interface Admin {
  id?: string;
  firstName: string;
  lastName: string;
  designation?: any;
  email: string;
  image?: string;
  doj?: string;
  roles?: string[];
  nic?: string;
  contactNumber?: string;
}

export interface AdminCreationParams {
  name: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.BASE_URL + 'admin';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private token: TokenService) { }

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
      const url = `${this.baseUrl}`;
      const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
      return data as Observable<{ message: string, body?: any }>;
    }
 
    edit(admin: any, id: any) {
      const token = localStorage.getItem('token');
      const url = `${this.baseUrl}/${id}`;
      const data = this.http.patch(url,admin,{headers: { Authorization: `Bearer ${token}` },});
      return data as Observable<{ message: string, body?: any }>;
    }


    getAdmin(id: string): Observable<{ data: Admin }> {
      const token = localStorage.getItem('token');
      const url = `${this.baseUrl}/${id}`;
      const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
      return data as Observable<{ data: Admin }>;
    }


    getAdmins(): Observable<{ data: Admin[], total: number}> {
      const token = localStorage.getItem('token');
      const url = `${this.baseUrl}`;
      const data = this.http.get(url,{headers: { Authorization: `Bearer ${token}` },});
      return data as Observable<{ data: Admin[], total: number }>;
    }

    deleteAdmin(admin: any, id: any) {
      const token = localStorage.getItem('token');
      const url = `${this.baseUrl}/${id}`;
      const data = this.http.patch(url,admin,{headers: { Authorization: `Bearer ${token}` },});
      return data as Observable<{ message: string, body?: any }>;
    }
  
    // disableAdmin(id: string): Observable<{ message: string, body?: any }> {
    //   const token = localStorage.getItem('token');
    //   const url = `${this.baseUrl}/${id}/disable`;
    //   const data = this.http.patch(url,{},{headers: { Authorization: `Bearer ${token}` },});
    //   return data as Observable<{ message: string, body?: any }>;
    // }
}
