import { TestBed } from '@angular/core/testing';

import { SupportedBrowsersService } from './supported-browsers.service';

describe('SupportedBrowsersService', () => {
  let service: SupportedBrowsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportedBrowsersService]
    });

    service = TestBed.inject(SupportedBrowsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
