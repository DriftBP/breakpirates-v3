import { TestBed, inject } from '@angular/core/testing';

import { TuneInService } from './tune-in.service';

describe('TuneInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TuneInService]
    });
  });

  it('should be created', inject([TuneInService], (service: TuneInService) => {
    expect(service).toBeTruthy();
  }));
});
