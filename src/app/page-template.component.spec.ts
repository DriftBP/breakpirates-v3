import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { PageTemplateComponent } from './page-template.component';
import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { MockGoogleAnalyticsService } from '../test/services/mock.google-analytics.service';
import { MockScheduleService } from '../test/services/mock.schedule.service';
import { ScheduleService } from './schedule/services/schedule.service';
import { TranslateModule } from '@ngx-translate/core';
import { MockSocialService } from '../test/services/mock.social.service';
import { SocialService } from './social/services/social.service';

const mockGoogleAnalyticsService = MockGoogleAnalyticsService;

describe('PageTemplateComponent', () => {
  let component: PageTemplateComponent;
  let fixture: ComponentFixture<PageTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [
          PageTemplateComponent,
          TranslateModule.forRoot(),
          NoopAnimationsModule
        ],
        providers: [
          {
            provide: ScheduleService,
            useClass: MockScheduleService
          },
          {
            provide: SocialService,
            useClass: MockSocialService
          },
          {
            provide: GoogleAnalyticsService,
            useValue: mockGoogleAnalyticsService
          },
          {
            provide: ActivatedRoute,
            useValue: {}
          }
        ]
    });
    fixture = TestBed.createComponent(PageTemplateComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
