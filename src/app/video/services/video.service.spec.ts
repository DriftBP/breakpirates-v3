import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { VideoService } from './video.service';

describe('VideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([VideoService], (service: VideoService) => {
    expect(service).toBeTruthy();
  }));
});
