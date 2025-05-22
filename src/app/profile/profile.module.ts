import { NgModule } from '@angular/core';

import { ScheduleModule } from '../schedule/schedule.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [
    ProfileRoutingModule,
    ScheduleModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
