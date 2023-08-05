import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.BASE_URL + 'users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options: any;

  constructor(private http: HttpClient, private token: TokenService, private Auth: AuthService, private router: Router,) {
    
  }
  
  login(data) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, data, { headers: this.headers });
  }
  request(data) {
    const url = `${this.baseUrl}/request`;
    return this.http.post(url, data, { headers: this.headers });
  }
  passwordChange(postData: any): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}/password`;
    const data = this.http.patch(url,postData,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }
}