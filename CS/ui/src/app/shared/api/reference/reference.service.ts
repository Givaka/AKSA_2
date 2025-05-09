import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@shared/data/env';
import { Base } from '@shared/data/interface';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService {
  private readonly apiUrl = env.apiURL + '/reference';

  constructor(private http: HttpClient) {}

  getPosition() {
    return this.http.request<Base[]>(
      'GET',
      `${this.apiUrl}/reference/positions`,
      {
        withCredentials: true,
      }
    );
  }

  getStatusScientific() {
    return this.http.request<Base[]>(
      'GET',
      `${this.apiUrl}/reference/scientific`,
      {
        withCredentials: true,
      }
    );
  }

  getStatusStudent() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/status/student`, {
      withCredentials: true,
    });
  }

  getStatusBenefit() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/status/benefit`, {
      withCredentials: true,
    });
  }

  getFormAdmission() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/form/admission`, {
      withCredentials: true,
    });
  }

  getFormStudy() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/form/study`, {
      withCredentials: true,
    });
  }
}
