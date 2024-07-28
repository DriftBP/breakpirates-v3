import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule,
    ScheduleModule,
    FontAwesomeModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
