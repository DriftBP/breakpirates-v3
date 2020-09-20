import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Components
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DonateComponent } from './donate/donate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { RadioPlayerComponent } from './radio-player/radio-player.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HostListComponent } from './host-list/host-list.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ServerStatsComponent } from './server-stats/server-stats.component';
import { ChatRoomPromoComponent } from './chat-room-promo/chat-room-promo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SupportedBrowsersNoticeComponent } from './supported-browsers-notice/supported-browsers-notice.component';

// Services
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { NewsService } from '../news/news.service';
import { SocialService } from './services/social.service';
import { ScheduleService } from './services/schedule.service';

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { MapToArrayPipe } from './pipes/map-to-array.pipe';
import { TimePipe } from './pipes/time.pipe';
import { FormattedDatePipe } from './pipes/formatted-date.pipe';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { IsoDatePipe } from './pipes/iso-date.pipe';

// Directives
import { ActiveDirective } from './directives/active.directive';
import { DialogComponent } from './dialog/dialog.component';
import { ImageClickDirective } from './directives/image-click.directive';

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
  ],
  declarations: [
    NavigationComponent,
    NowPlayingComponent,
    DonateComponent,
    SocialLinksComponent,
    SafePipe,
    SortByPipe,
    MapToArrayPipe,
    TimePipe,
    FormattedDatePipe,
    IsoDatePipe,
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent,
    GenreListComponent,
    SidebarComponent,
    FooterComponent,
    ServerStatsComponent,
    ChatRoomPromoComponent,
    NotFoundComponent,
    BreadcrumbComponent,
    FooterBarComponent,
    SupportedBrowsersNoticeComponent,
    ActiveDirective,
    DialogComponent,
    ImageClickDirective
  ],
  exports: [
    NavigationComponent,
    NowPlayingComponent,
    DonateComponent,
    SocialLinksComponent,
    SafePipe,
    SortByPipe,
    MapToArrayPipe,
    TimePipe,
    FormattedDatePipe,
    IsoDatePipe,
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent,
    GenreListComponent,
    FooterComponent,
    TranslateModule,
    BreadcrumbComponent,
    FooterBarComponent,
    SupportedBrowsersNoticeComponent,
    ActiveDirective,
    DialogComponent,
    ImageClickDirective
  ],
  providers: [
    GoogleAnalyticsService,
    NewsService,
    SocialService,
    ScheduleService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
