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

// Pipes
import { SafePipe } from './pipes/safe.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { MapToArrayPipe } from './pipes/map-to-array.pipe';
import { HostListComponent } from './host-list/host-list.component';
import { TimePipe } from './pipes/time.pipe';

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
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent
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
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent,
    HostListComponent
  ]
})
export class SharedModule { }
