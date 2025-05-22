import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProfilesComponent } from './profiles.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileButtonComponent } from './profile-button/profile-button.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule,
    ScheduleModule,
    FontAwesomeModule,
    HostDetailsComponent,
    ProfilesComponent,
    ProfileButtonComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
