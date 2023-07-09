import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TokenService } from './token.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.BASE_URL + 'admin';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private token: TokenService) { }

  //Get Admin
  getAdmin(data:any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.get(this.baseUrl, data)
  }

  //Add Admin
  addAdmin(data:any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.post(this.baseUrl, data, {headers: this.headers})
  }

  //Edit Admin
  editAdmin(data:any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.patch(this.baseUrl, data, {headers: this.headers})
  }

  //Delete Admin
  deleteAdmin(data:any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token.gettoken().split('JWT')[1])
    return this.http.delete(this.baseUrl, data)
  }
}
