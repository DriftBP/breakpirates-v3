import { TestBed } from '@angular/core/testing';

import { SoundboardService } from './soundboard.service';

describe('SoundboardService', () => {
  let service: SoundboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundboardService]
    });

    service = TestBed.inject(SoundboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
