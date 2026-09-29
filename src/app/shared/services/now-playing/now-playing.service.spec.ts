import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { NowPlayingService } from './now-playing.service';

describe('NowPlayingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', inject([NowPlayingService], (service: NowPlayingService) => {
    expect(service).toBeTruthy();
  }));
});
