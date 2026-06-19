import { TestBed } from '@angular/core/testing';

import { SocialService } from './social.service';

describe('SocialService', () => {
  let service: SocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialService]
    });

    service = TestBed.inject(SocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return three social sites', () => {
    expect(service.getSocialSites().length).toBe(3);
  });
});
