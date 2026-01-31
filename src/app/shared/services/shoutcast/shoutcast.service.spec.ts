import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ShoutcastService } from './shoutcast.service';

describe('ShoutcastService', () => {
  let service: ShoutcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShoutcastService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ShoutcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse current track from CSV response', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    let result: string | undefined;
    service.getCurrentTrack().subscribe(track => result = track);
    const req = httpMock.expectOne((r) => r.url.includes('allorigins'));
    req.flush('32,1,80,80,31,128,Test Track Name</body></html>');
    expect(result).toBe('Test Track Name');
    httpMock.verify();
  });
});
