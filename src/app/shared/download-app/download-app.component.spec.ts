import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';

import { DownloadAppComponent } from './download-app.component';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { createMockGoogleAnalyticsService, MockGoogleAnalyticsService } from '../../../test/services/mock.google-analytics.service';

let mockGoogleAnalyticsService: MockGoogleAnalyticsService;

describe('DownloadAppComponent', () => {
  let component: DownloadAppComponent;
  let fixture: ComponentFixture<DownloadAppComponent>;

  beforeEach(async () => {
    mockGoogleAnalyticsService = createMockGoogleAnalyticsService();
    TestBed.configureTestingModule({
        imports: [
          DownloadAppComponent,
          TranslatePipe
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
