import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

import { App } from './app';
import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../test/services/mock.google-analytics.service';
import { MockRouterService } from '../test/services/mock.router.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should indicate loading on NavigationStart', async () => {
    component['processEvent'](new NavigationStart(1, ''));

    expect(component.loading).toBeTruthy();
  });

  it('should not indicate loading on NavigationEnd', async () => {
    component['processEvent'](new NavigationEnd(1, '', ''));

    expect(component.loading).toBeFalsy();
  });

  it('should track page hit on NavigationEnd', async () => {
    component['processEvent'](new NavigationEnd(1, '', ''));

    expect(mockGoogleAnalyticsService.trackPageHit.mock.calls.length).toEqual(1);
  });

  it('should clean up subscriptions onDestroy', async () => {
    component.ngOnDestroy();

    expect(component['eventsSubscription'].closed).toEqual(true);
  });
});
