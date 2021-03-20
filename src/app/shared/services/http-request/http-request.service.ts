import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { HttpRequestConfig } from './http-request-config';

const defaultConfig: HttpRequestConfig = {
  useCache: true
};

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private responseCache = new Map();

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, config: HttpRequestConfig = defaultConfig) {
    if (config.useCache) {
      const cachedResponse = this.responseCache.get(url);

      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    const response = this.http.get<T>(url);
    response.subscribe(data => this.responseCache.set(url, data));
    return response;
  }
}
