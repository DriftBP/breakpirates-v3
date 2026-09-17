import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

import { App } from './app';
import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { createMockGoogleAnalyticsService, MockGoogleAnalyticsService } from '../test/services/mock.google-analytics.service';
import { MockRouterService } from '../test/services/mock.router.service';

let mockGoogleAnalyticsService: MockGoogleAnalyticsService;

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(() => {
    mockGoogleAnalyticsService = createMockGoogleAnalyticsService();
    TestBed.configureTestingModule({
      imports: [
        App
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouterService
        },
        {
          provide: GoogleAnalyticsService,
          useValue: mockGoogleAnalyticsService
        }
      ]
    });
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should indicate loading on NavigationStart', () => {
    component['processEvent'](new NavigationStart(1, ''));

    expect(component.loading).toBeTruthy();
  });

  it('should not indicate loading on NavigationEnd', () => {
    component['processEvent'](new NavigationEnd(1, '', ''));

    expect(component.loading).toBeFalsy();
  });

  it('should track page hit on NavigationEnd', () => {
    component['processEvent'](new NavigationEnd(1, '', ''));

    expect(mockGoogleAnalyticsService.trackPageHit).toHaveBeenCalledOnce();
  });

  it('should clean up subscriptions onDestroy', () => {
    component.ngOnDestroy();

    expect(component['eventsSubscription'].closed).toEqual(true);
  });
});
