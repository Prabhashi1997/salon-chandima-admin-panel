import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from "./shared.service";

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
  baseUrl = 'http://127.0.0.1:3000/payment';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient,
              private _sharedService: SharedService) {
  }

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

  createPayment(data): Observable<any> {
    return this._http.put(`${this.baseUrl}/createPayment`, data)
      .pipe(catchError(this._sharedService.httpErrorManagement))
  }

  getPayments(): Observable<{ payments: Payment[], total: number}> {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}`;
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
