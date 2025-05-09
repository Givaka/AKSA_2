import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@shared/data/env';
import { Base } from '@shared/data/interface';

@Injectable({
  providedIn: 'root',
})
export class DisciplineService {
  private readonly apiUrl = env.apiURL + '/reference';

  constructor(private http: HttpClient) {}
  get() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/disciplines`, {
      withCredentials: true,
    });
  }

  create(data: Base) {
    return this.http.request('POST', `${this.apiUrl}/disciplines`, {
      withCredentials: true,
      body: data,
    });
  }

  change(id: string, data: Base) {
    return this.http.request('PUT', `${this.apiUrl}/disciplines/${id}`, {
      withCredentials: true,
      body: data,
    });
  }

  delate(id: string) {
    return this.http.request('DELETE', `${this.apiUrl}/disciplines/${id}`, {
      withCredentials: true,
    });
  }
}
