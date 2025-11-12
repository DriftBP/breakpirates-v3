import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../test/services/mock.google-analytics.service';
import { MockRouterService } from '../test/services/mock.router.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
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
