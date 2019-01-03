import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MusicService } from './music.service';

describe('MusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([MusicService], (service: MusicService) => {
    expect(service).toBeTruthy();
  }));
});
