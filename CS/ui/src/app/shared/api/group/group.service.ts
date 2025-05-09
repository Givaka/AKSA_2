import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '@shared/data/env';
import { Base } from '@shared/data/interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly apiUrl = env.apiURL + '/reference';

  constructor(private http: HttpClient) {}
  get() {
    return this.http.request<Base[]>('GET', `${this.apiUrl}/group`, {
      withCredentials: true,
    });
  }

  create(data: Base) {
    return this.http.request('POST', `${this.apiUrl}/group`, {
      withCredentials: true,
      body: data,
    });
  }

  change(id: string, data: Base) {
    return this.http.request('PUT', `${this.apiUrl}/group/${id}`, {
      withCredentials: true,
      body: data,
    });
  }

  delate(id: string) {
    return this.http.request('DELETE', `${this.apiUrl}/group/${id}`, {
      withCredentials: true,
    });
  }
}
