import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@shared/data/env';
import { Teacher } from '@shared/data/interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private readonly apiUrl = env.apiURL;
  
    constructor(private http: HttpClient) {}
    get() {
      return this.http.request<Teacher[]>('GET', `${this.apiUrl}/teachers`, {
        withCredentials: true,
      });
    }
  
    create(data: Teacher) {
      return this.http.request('POST', `${this.apiUrl}/teachers`, {
        withCredentials: true,
        body: data,
      });
    }
  
    change(id: string, data: Teacher) {
      return this.http.request('PUT', `${this.apiUrl}/teachers/${id}`, {
        withCredentials: true,
        body: data,
      });
    }
  
    delate(id: string) {
      return this.http.request('DELETE', `${this.apiUrl}/teachers/${id}`, {
        withCredentials: true,
      });
    }
}
