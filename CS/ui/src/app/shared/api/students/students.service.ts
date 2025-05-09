import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@shared/data/env';
import { Student } from '@shared/data/interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly apiUrl = env.apiURL;

  constructor(private http: HttpClient) {}
  get() {
    return this.http.request<Student[]>('GET', `${this.apiUrl}/students`, {
      withCredentials: true,
    });
  }

  create(data: Student) {
    return this.http.request('POST', `${this.apiUrl}/students`, {
      withCredentials: true,
      body: data,
    });
  }

  change(id: string, data: Student) {
    return this.http.request('PUT', `${this.apiUrl}/students/${id}`, {
      withCredentials: true,
      body: data,
    });
  }

  delate(id: string) {
    return this.http.request('DELETE', `${this.apiUrl}/students/${id}`, {
      withCredentials: true,
    });
  }
}
