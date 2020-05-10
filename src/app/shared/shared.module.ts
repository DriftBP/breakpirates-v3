import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

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

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { MapToArrayPipe } from './pipes/map-to-array.pipe';
import { TimePipe } from './pipes/time.pipe';
import { FormattedDatePipe } from './pipes/formatted-date.pipe';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    RouterModule
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
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent,
    GenreListComponent
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
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent,
    GenreListComponent
  ]
})
export class SharedModule { }
