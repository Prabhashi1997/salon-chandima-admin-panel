import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private data = new BehaviorSubject({
    name: ' ',
    image: ' '
  });
  data$ = this.data.asObservable();
  constructor(private token: TokenService,private http: HttpClient) {
    if(token.loggedIn()){
      this.changeData({ image: token.getImg(), name: token.getFirstName() + ' ' + token.getLastName() })
    }
   }

  changeData(data) {
    this.data.next(data)
  }

  addMessage(postData: any): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${environment.BASE_URL}common/message`;
    const data = this.http.post(url,postData,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }

  deleteMessage(id: number): Observable<{ message: string, body?: any }> {
    const token = localStorage.getItem('token');
    const url = `${environment.BASE_URL}admin/messages/${id}`;
    const data = this.http.delete(url,{headers: { Authorization: `Bearer ${token}` },});
    return data as Observable<{ message: string, body?: any }>;
  }
  
}
