import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DonateComponent } from './donate/donate.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatRoomPromoComponent } from './chat-room-promo/chat-room-promo.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Services
import { GoogleAnalyticsService } from './services/google-analytics/google-analytics.service';
import { ScheduleService } from '../schedule/services/schedule.service';
import { SocialService } from '../social/services/social.service';
import { HttpRequestService } from './services/http-request/http-request.service';

// Directives
import { ImageClickDirective } from './directives/image-click.directive';
import { ShowService } from '../schedule/services/show.service';
import { SafePipe } from './pipes/safe.pipe';
import { TimePipe } from './pipes/time.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';

export function customHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
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
    NgOptimizedImage,
    SafePipe,
    TimePipe,
    SortByPipe,
  ],
  declarations: [
    DonateComponent,
    ContentBoxComponent,
    LoadingSpinnerComponent,
    SidebarComponent,
    ChatRoomPromoComponent,
    NotFoundComponent,
    ImageClickDirective
  ],
  exports: [
    DonateComponent,
    ContentBoxComponent,
    LoadingSpinnerComponent,
    TranslateModule,
    ImageClickDirective,
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
