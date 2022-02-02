import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Address } from '../models/address.model';

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

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`)
  }

  saveContact(contact:any){
    return this.http.post(`${this.apiUrl}/contacts/`,contact,httpOptions)
  }

  getContactByID(id:number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`)
  }  

  saveAddress(address:Address,id:number): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/contacts/${id}/addresses`, address, httpOptions)
  }

  updateAddress(address:any,id:number) {
    return this.http.put(`${this.apiUrl}/addresses/${id}`, address, httpOptions)
  }

  deleteAddress(id:number) {
    return this.http.delete(`${this.apiUrl}/addresses/${id}`, httpOptions)
  }

  getAddressesByID(id:number) {
    return this.http.get(`${this.apiUrl}/addresses?contactId=${id}`)
  }  
}
