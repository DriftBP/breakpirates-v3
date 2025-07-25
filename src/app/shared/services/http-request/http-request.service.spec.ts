import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';

describe('HttpRequestService', () => {
  let service: HttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(HttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
