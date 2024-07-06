import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SupportedBrowsersNoticeComponent } from './supported-browsers-notice.component';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../../../test/services/mock.google-analytics.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('SupportedBrowsersNoticeComponent', () => {
  let component: SupportedBrowsersNoticeComponent;
  let fixture: ComponentFixture<SupportedBrowsersNoticeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ SupportedBrowsersNoticeComponent ],
        providers: [
          {
            provide: GoogleAnalyticsService,
            useValue: mockGoogleAnalyticsService
          }
        ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(SupportedBrowsersNoticeComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
