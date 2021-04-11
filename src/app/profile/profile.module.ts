import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { MixcloudWidgetComponent } from './mixcloud-widget/mixcloud-widget.component';
import { TwitterWidgetComponent } from './twitter-widget/twitter-widget.component';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { ProfileService } from './services/profile.service';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ReadMoreComponent } from './read-more/read-more.component';
import { HostNavigationComponent } from './host-navigation/host-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule,
    ScheduleModule
  ],
  declarations: [
    ProfilesComponent,
    HostDetailsComponent,
    MixcloudWidgetComponent,
    TwitterWidgetComponent,
    ProfileButtonComponent,
    SortByPipe,
    ReadMoreComponent,
    HostNavigationComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
