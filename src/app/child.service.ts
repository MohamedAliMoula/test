import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private baseUrl = 'https://webserver.staging.4indata.fr/api';
  private token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyOTU3MDQ0LCJqdGkiOiJlOTBlNDJlMGM0ZTk0ZWQyYjZmMTgxYmFiNTE2ZTI5MSIsInVzZXJfaWQiOjY5Njh9.vC4yLtOc06996gTDCGrrQooSBQpS5VOORDCGK2se0gY';


  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // Replace with your actual token
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Get list of children for a specific user
  getChildren(username: string): Observable<any> {
    const url = `${this.baseUrl}/users/${username}/childs/`;
    return this.http.get(url, { headers: this.headers });
  }

  // Get details of a specific child
  getChild(childId: number): Observable<any> {
    const url = `${this.baseUrl}/childs/${childId}/`;
    return this.http.get(url, { headers: this.headers });
  }

  // Update details of a specific child
  updateChild(childId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/childs/${childId}/`;
  
    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}` // Replace this.token with your actual token variable
    });
  
    return this.http.put(url, formData, { headers });
  }
  
  
}