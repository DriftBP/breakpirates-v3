import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleComponent } from './schedule.component';
import { ShowSummaryComponent } from './show-summary/show-summary.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShowComponent } from './show/show.component';
import { DaySelectComponent } from './day-select/day-select.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule
  ],
  declarations: [ScheduleComponent, ShowSummaryComponent, ShowComponent, DaySelectComponent, DayScheduleComponent],
  exports: [
    ShowSummaryComponent
  ]
})
export class ScheduleModule { }
