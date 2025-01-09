import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.baseUrl}api/chats/getchats`; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getMessages(senderEmail: string, receiverEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`);
  }
}
