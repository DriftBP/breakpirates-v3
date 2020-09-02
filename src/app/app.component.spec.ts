import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { RouterModule, Routes, NavigationStart, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { GoogleAnalyticsService } from './shared/services/google-analytics.service';

const routes: Routes = [];

const mockGoogleAnalyticsService = {
  trackPageHit: jest.fn()
};

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .replaceModule(RouterModule, RouterTestingModule.withRoutes(routes))
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .mock(GoogleAnalyticsService, mockGoogleAnalyticsService);
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should indicate loading on NavigationStart', async () => {
    const { instance } = await shallow.render();

    instance['processEvent'](new NavigationStart(1, ''));

    expect(instance.loading).toBeTruthy();
  });

  it('should not indicate loading on NavigationEnd', async () => {
    const { instance } = await shallow.render();

    instance['processEvent'](new NavigationEnd(1, '', ''));

    expect(instance.loading).toBeFalsy();
  });

  it('should track page hit on NavigationEnd', async () => {
    const { instance } = await shallow.render();

    instance['processEvent'](new NavigationEnd(1, '', ''));

    expect(mockGoogleAnalyticsService.trackPageHit.mock.calls.length).toEqual(1);
  });

  it('should clean up subscriptions onDestroy', async () => {
    const { instance } = await shallow.render();

    instance.ngOnDestroy();

    expect(instance['eventsSubscription'].closed).toEqual(true);
  });
});
