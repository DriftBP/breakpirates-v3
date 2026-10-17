import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { MockRouterService } from '../../../../test/services/mock.router.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let mockRouterService: MockRouterService;

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
  mockRouterService = TestBed.inject(Router) as unknown as MockRouterService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should collapse after navigation ends', () => {
    service.setCollapsed(false);
    mockRouterService.emit(new NavigationEnd(1, '/before', '/after'));

    expect(service.isCollapsed()).toBeTruthy();
  });
});
