import { TestBed } from '@angular/core/testing';

import { DjNameService } from './dj-name.service';

describe('DjNameService', () => {
  let service: DjNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DjNameService]
    });

    service = TestBed.inject(DjNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
