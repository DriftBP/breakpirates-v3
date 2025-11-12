import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MusicService } from './music.service';

describe('MusicService', () => {
  let service: MusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MusicService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    });

    service = TestBed.inject(MusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
