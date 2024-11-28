import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService  {
  private baseUrl = 'https://webserver.staging.4indata.fr/api/users';
  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyOTU3MDQ0LCJqdGkiOiJlOTBlNDJlMGM0ZTk0ZWQyYjZmMTgxYmFiNTE2ZTI5MSIsInVzZXJfaWQiOjY5Njh9.vC4yLtOc06996gTDCGrrQooSBQpS5VOORDCGK2se0gY';

  private httpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  
  getProfile(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}/`, {
      headers: this.httpHeaders,
    });
  }

 
  updateProfile(username: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${username}/`, payload, {
      headers: this.httpHeaders,
    });
  }
}