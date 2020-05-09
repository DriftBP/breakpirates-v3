import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleComponent } from './schedule.component';
import { ShowSummaryComponent } from './show-summary/show-summary.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleService } from './schedule.service';
import { SharedModule } from '../shared/shared.module';
import { ShowComponent } from './show/show.component';
import { ShowDetailsResolve } from './show-details.resolve';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule
  ],
  declarations: [ScheduleComponent, ShowSummaryComponent, ShowComponent],
  exports: [
    ShowSummaryComponent
  ],
  providers: [
    ScheduleService,
    ShowDetailsResolve
  ]
})
export class ScheduleModule { }
