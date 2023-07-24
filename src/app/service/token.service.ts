import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:3000/user'
  };
  name
  image
  constructor(private http: HttpClient, private router: Router,) {}

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  gettoken() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.gettoken();
    if (token) {
      console.log(token)
      const payload = this.payload(token);

      if (payload) {
        if (Date.now() >= payload.exp * 1000 ) {
          Swal.fire(
            'Time Out!',
            'Please login again!',
            'error'
          );
          this.remove()
          return false;
        }
        return (Date.now() <= payload.exp * 1000) ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  loggedIn() {
    return this.isValid();
  }

  registeredIn() {
    return this.isValid();
  }

  public getEmail() {
    return this.payload(this.gettoken()).email;
  }

  public getRole(){
    return this.payload(this.gettoken()).role
  }

  public getId() {
    return this.payload(this.gettoken())._id;
  }

  public getFirstName() {
    return this.payload(this.gettoken()).firstName;
  }

  public getLastName() {
    return this.payload(this.gettoken()).lastName;
  }

  public getImg() {
    return this.payload(this.gettoken()).profilePic;
  }

  public getPhone() {
    return this.payload(this.gettoken()).telephone;
  }

  public isUserAdmin(): boolean {
    return !!this.payload(this.gettoken()).role.find((n) => n === 'admin');
  }
  public isUserEmploy(): boolean {
    return !!this.payload(this.gettoken()).role.find((n) => n === 'employee');
  }
  public isUserCustomer(): boolean {
    return !!this.payload(this.gettoken()).role.find((n) => n === 'customer');
  }

  logOut() {
    this.remove();
    this.router.navigateByUrl('/')
  }
}
