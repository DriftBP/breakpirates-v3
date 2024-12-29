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

// Components
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DonateComponent } from './donate/donate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { RadioPlayerComponent } from './radio-player/radio-player.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { ChatRoomPromoComponent } from './chat-room-promo/chat-room-promo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SupportedBrowsersNoticeComponent } from './supported-browsers-notice/supported-browsers-notice.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { AdUnitComponent } from './ad-unit/ad-unit.component';
import { DialogComponent } from './dialog/dialog.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';

// Services
import { GoogleAnalyticsService } from './services/google-analytics/google-analytics.service';
import { ScheduleService } from '../schedule/services/schedule.service';
import { SocialService } from '../social/services/social.service';
import { HttpRequestService } from './services/http-request/http-request.service';

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { TimePipe } from './pipes/time.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';

// Directives
import { ActiveDirective } from './directives/active.directive';
import { ImageClickDirective } from './directives/image-click.directive';
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
        NgOptimizedImage,
        SafePipe,
        NavigationComponent,
        NowPlayingComponent,
        DonateComponent,
        TimePipe,
        SortByPipe,
        ContentBoxComponent,
        RadioPlayerComponent,
        LoadingSpinnerComponent,
        SidebarComponent,
        FooterComponent,
        ThemeSelectComponent,
        ChatRoomPromoComponent,
        NotFoundComponent,
        BreadcrumbComponent,
        FooterBarComponent,
        SupportedBrowsersNoticeComponent,
        ActiveDirective,
        DialogComponent,
        ImageClickDirective,
        AdUnitComponent,
        ProgressIndicatorComponent
    ],
    exports: [
        NavigationComponent,
        NowPlayingComponent,
        DonateComponent,
        SafePipe,
        TimePipe,
        SortByPipe,
        ContentBoxComponent,
        RadioPlayerComponent,
        LoadingSpinnerComponent,
        FooterComponent,
        TranslateModule,
        BreadcrumbComponent,
        FooterBarComponent,
        SupportedBrowsersNoticeComponent,
        ActiveDirective,
        DialogComponent,
        AdUnitComponent
    ],
    providers: [
        HttpRequestService,
        GoogleAnalyticsService,
        SocialService,
        ScheduleService,
        ShowService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
