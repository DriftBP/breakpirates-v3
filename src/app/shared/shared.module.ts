import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Services
import { GoogleAnalyticsService } from './services/google-analytics/google-analytics.service';
import { ScheduleService } from '../schedule/services/schedule.service';
import { SocialService } from '../social/services/social.service';
import { HttpRequestService } from './services/http-request/http-request.service';
import { ShowService } from '../schedule/services/show.service';

export function customHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customHttpLoader,
        deps: [HttpClient],
      },
      isolate: false
    }),
    FontAwesomeModule,
    NgOptimizedImage
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    HttpRequestService,
    GoogleAnalyticsService,
    SocialService,
    ScheduleService,
    ShowService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
