import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { HttpRequestConfig } from './http-request-config';
import { DataCacheService } from '../data-cache/data-cache.service';

const defaultConfig: HttpRequestConfig = {
  useCache: true
};

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(
    private readonly http: HttpClient,
    private readonly cache: DataCacheService<any>
  ) { }

  get<T>(url: string, config: HttpRequestConfig = defaultConfig) {
    if (config.useCache) {
      const cachedResponse = this.cache.get(url);

      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    const response = this.http.get<T>(url);
    response.subscribe(data => this.cache.put(url, data));
    return response;
  }
}
