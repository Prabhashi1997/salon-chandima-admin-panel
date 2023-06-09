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

    // this.headers.append('enctype', 'multi-part/form-data');
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('X-Requested-With', 'XMLHttpRequest');



  }

  adduser(data) {
    const url = `${this.baseUrl}/signup`;
    return this.http.post(url, data, { headers: this.headers });
  }

  patientadd(data) {
    const url = `${this.baseUrl}/patientadd`;
    return this.http.post(url, data, { headers: this.headers });
  }

  login(data) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, data, { headers: this.headers });
  }
  loguot(){
    this.Auth.changeAuthStatus(false);
    this.token.remove();
    this.router.navigate(['/']);
  }
  request(data) {
    const url = `${this.baseUrl}/request`;
    return this.http.post(url, data, { headers: this.headers });
  }
  getprofile() {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.get(`${this.baseUrl}/profile`, { headers: header });
  }

  temporarydisable(data) {
    return this.http.post(`${this.baseUrl}/temporarydisable`, data);
  }

  defaultpassword(data) {
    return this.http.post(`${this.baseUrl}/defaultpassword`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/emairequest`, data);
  }

  changePassword(data,token) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    return this.http.post(`${this.baseUrl}/changePassword`, data , { headers: header });
  }

  adminprofileChange(data) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(`${this.baseUrl}/adminprofileChange`, data , { headers: header });
  }

  customerProfileChange(data) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(`${this.baseUrl}/patientprofileChange`, data, { headers: header });
  }

  employProfileChange(data) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(`${this.baseUrl}/salonProfileChange`, data, { headers: header });
  }

  mangerProfileChange(data) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(`${this.baseUrl}/mangerProfileChange`, data, { headers: header });
  }

  profileChangePassword(data) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(`${this.baseUrl}/profileChanePassword`, data, { headers: header });
  }


  // donor activate
  customerActivate(data){
    return this.http.post(`${this.baseUrl}/donorActive`, data);
  }

  // get all users
  getUsers() {
    return this.http.get(`${this.baseUrl}`);
  }

  activeUser(userEmail: string) {
    return this.http.post(`${this.baseUrl}/patientActivate`, { email:userEmail });
  }

  removePatient(userEmail: string) {
    return this.http.post(`${this.baseUrl}/removePatient`, { email:userEmail });
  }

  // delete a single user
  deleteUser(id): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }


  // error management

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
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
}
