import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';

describe('HttpRequestService', () => {
  let service: HttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
