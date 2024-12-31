import { Injectable } from '@angular/core';

interface ICache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put(key: string, value: any): void;
}

@Injectable({
  providedIn: 'root'
})
export class HttpRequestCacheService implements ICache {
  private responseCache = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: string): any {
    return this.responseCache.get(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put(key: string, value: any): void {
    this.responseCache.set(key, value)
  }
}
