import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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

  it('should make one request and cache the response', () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const url = '/api/data';
    const expectedData = { value: 1 };

    service.get<typeof expectedData>(url).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    httpTesting.expectOne(url).flush(expectedData);

    service.get<typeof expectedData>(url).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    httpTesting.expectNone(url);
  });
});
