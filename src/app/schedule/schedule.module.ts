import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DayService } from './services/day.service';
import { ScheduleService } from './services/schedule.service';
import { ShowService } from './services/show.service';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    DayService,
    ScheduleService,
    ShowService
  ]
})
export class ScheduleModule { }
