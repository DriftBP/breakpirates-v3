import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DownloadAppComponent } from './download-app.component';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../../../test/services/mock.google-analytics.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('DownloadAppComponent', () => {
  let component: DownloadAppComponent;
  let fixture: ComponentFixture<DownloadAppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          DownloadAppComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: GoogleAnalyticsService,
            useValue: mockGoogleAnalyticsService
          }
        ]
    });
    fixture = TestBed.createComponent(DownloadAppComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should track download link clicks', async () => {
    fixture.detectChanges();

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(0);

    component.donateFormElement().nativeElement.dispatchEvent(new Event('click'));

    expect(mockGoogleAnalyticsService.trackEvent.mock.calls.length).toEqual(1);
  });
});
