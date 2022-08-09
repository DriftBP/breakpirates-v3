import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { DonateComponent } from './donate.component';
import { SharedModule } from '../shared.module';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

const mockGoogleAnalyticsService = {
  trackEvent: jest.fn()
};

describe('DonateComponent', () => {
  let shallow: Shallow<DonateComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(DonateComponent, SharedModule)
      .mock(GoogleAnalyticsService, mockGoogleAnalyticsService);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should track form submission', async () => {
    const { instance } = await shallow.render();

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(0);

    instance.donateFormElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(1);
  });
});
