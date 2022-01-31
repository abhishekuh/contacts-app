import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from './contact.model';
import { Address } from './address.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  /** GET Contacts from the server */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`)
      // .pipe(
        // catchError(this.handleError('getContacts', []))
      // );
  }

  getContactByID(id:number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`)
      // .pipe(
        // catchError(this.handleError('getContacts', []))
      // );
  }  

  saveAddresses(address:Address,id:number): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/contacts/${id}`, address, httpOptions)
      // .pipe(
      //   catchError(this.handleError('saveAddresses', hero))
      // );
  }
}
