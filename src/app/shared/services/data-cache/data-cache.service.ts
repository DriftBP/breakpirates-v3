import { Injectable } from '@angular/core';

interface ICache<T = any> {
  get(key: string): T | undefined;
  put(key: string, value: T): void;
}

@Injectable({
  providedIn: 'root'
})
export class DataCacheService<T = any> implements ICache<T> {
  private responseCache = new Map<string, T>();

  get(key: string): T | undefined {
    if (!this.responseCache.has(key)) return undefined;
    return this.responseCache.get(key);
  }

  put(key: string, value: T): void {
    this.responseCache.set(key, value);
  }
}
