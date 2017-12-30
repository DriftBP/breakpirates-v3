import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles.component';
import { HostDetailsComponent } from './host-details/host-details.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ScheduleModule
  ],
  declarations: [ProfilesComponent, HostDetailsComponent]
})
export class ProfileModule { }
