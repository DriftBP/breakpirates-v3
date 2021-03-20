import { Injectable } from '@angular/core';

interface ICache {
  get(key: string): any;
  put(key: string, value: any): void;
}

@Injectable({
  providedIn: 'root'
})
export class HttpRequestCacheService implements ICache {
  private responseCache = new Map();

  get(key: string): any {
    return this.responseCache.get(key);
  }

  put(key: string, value: any): void {
    this.responseCache.set(key, value)
  }
}
