import { TestBed } from '@angular/core/testing';

import { HttpRequestCacheService } from './http-request-cache.service';

describe('HttpRequestCacheService', () => {
  let service: HttpRequestCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestCacheService]
    });

    service = TestBed.inject(HttpRequestCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store value', () => {
    const key = 'test';
    const value = {
      testString: 'test',
      testBoolean: true,
      testArray: []
    }

    service.put(key, value);

    expect(service.get(key)).toEqual(value);
  });
});
