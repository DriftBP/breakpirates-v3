import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilesResolve } from './profiles.resolve';
import { HostDetailsResolve } from './host-details.resolve';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule,
    ScheduleModule
  ],
  declarations: [ProfilesComponent, HostDetailsComponent],
  providers: [
    ProfilesResolve,
    HostDetailsResolve,
    ProfileService
  ]
})
export class ProfileModule { }
