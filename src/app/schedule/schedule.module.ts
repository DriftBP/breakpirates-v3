import { NgModule } from '@angular/core';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { DayService } from './services/day.service';
import { ScheduleService } from './services/schedule.service';
import { ShowService } from './services/show.service';

@NgModule({
  imports: [
    ScheduleRoutingModule
  ],
  providers: [
    DayService,
    ScheduleService,
    ShowService
  ]
})
export class ScheduleModule { }
