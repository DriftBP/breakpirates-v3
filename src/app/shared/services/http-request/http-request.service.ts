import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of, tap } from 'rxjs';

import { HttpRequestConfig } from './http-request-config';
import { DataCacheService } from '../data-cache/data-cache.service';

const defaultConfig: HttpRequestConfig = {
  useCache: true
};

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject<DataCacheService<unknown>>(DataCacheService);
  get<T>(url: string, config: HttpRequestConfig = defaultConfig) {
    if (config.useCache) {
      const cachedResponse = this.cache.get(url);

      if (cachedResponse !== undefined) {
        return of(cachedResponse as T);
      }
    }

    return this.http.get<T>(url).pipe(
      tap(data => this.cache.put(url, data))
    );
  }
}
