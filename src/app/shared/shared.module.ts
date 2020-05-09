import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NowPlayingComponent } from './now-playing/now-playing.component';
import { DonateComponent } from './donate/donate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SafePipe } from './pipes/safe.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SocialLinksComponent } from './social-links/social-links.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { RadioPlayerComponent } from './radio-player/radio-player.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

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
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    NavigationComponent,
    NowPlayingComponent,
    DonateComponent,
    SocialLinksComponent,
    SafePipe,
    SortByPipe,
    ContentBoxComponent,
    RadioPlayerComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
