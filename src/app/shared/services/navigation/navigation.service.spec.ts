import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { MockRouterService } from '../../../../test/services/mock.router.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        {
          provide: Router,
          useClass: MockRouterService
        }
      ]
    });

    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
