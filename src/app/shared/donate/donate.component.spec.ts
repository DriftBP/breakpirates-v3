import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DonateComponent } from './donate.component';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../../../test/services/mock.google-analytics.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ DonateComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: GoogleAnalyticsService,
            useValue: mockGoogleAnalyticsService
          }
        ]
    });
    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should track form submission', async () => {
    fixture.detectChanges();

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(0);

    component.donateFormElement().nativeElement.dispatchEvent(new Event('submit'));

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(1);
  });
});
