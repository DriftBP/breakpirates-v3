import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleComponent } from './schedule.component';
import { ShowSummaryComponent } from './show-summary/show-summary.component';
import { ScheduleRoutingModule } from './schedule-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ],
  declarations: [ScheduleComponent, ShowSummaryComponent],
  exports: [
    ShowSummaryComponent
  ]
})
export class ScheduleModule { }
