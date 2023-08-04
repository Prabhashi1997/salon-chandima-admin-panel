import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from "./shared.service";
import {environment} from "../../environments/environment";

export interface Payment{
  id: number;
  type: string;
  description: string;
  price: number;
  card_expiry?: string;
  card_holder_name?: string;
  card_no?: string;
  merchant_id?: string;
  method?: string;
  order_id?: string;
  payhere_amount?: string;
  payhere_currency?: string;
  payment_id?: string;
  recurring?: string;
  status_code?: string;
  status_message?: string;
  transaction: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseUrl = `${environment.BASE_URL}payment`;


  constructor(private _http: HttpClient,
              private _sharedService: SharedService) {
  }


  createPayment(x): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}`;
    const data = this._http.post(url, x,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<any>;
  }

  getPayments(): Observable<{ payments: Payment[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}`;
    const data = this._http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ payments: Payment[], total: number }>;
  }

  getUserPayments(): Observable<{ payments: Payment[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}/user`;
    const data = this._http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ payments: Payment[], total: number }>;
  }

  getPayment(id: string): Observable<{ data: Payment }> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}/${id}`;
    const data = this._http.get(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ data: Payment }>;
  }
}
