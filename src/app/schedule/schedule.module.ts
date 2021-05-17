import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ScheduleComponent } from './schedule.component';
import { ShowSummaryComponent } from './show-summary/show-summary.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShowComponent } from './show/show.component';
import { DaySelectComponent } from './day-select/day-select.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { DayService } from './services/day.service';
import { ScheduleService } from './services/schedule.service';
import { GenreListComponent } from './genre-list/genre-list.component';
import { HostListComponent } from './host-list/host-list.component';
import { ShowService } from './services/show.service';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    ScheduleComponent,
    ShowSummaryComponent,
    ShowComponent,
    DaySelectComponent,
    DayScheduleComponent,
    GenreListComponent,
    HostListComponent
  ],
  exports: [
    ShowSummaryComponent
  ],
  providers: [
    DayService,
    ScheduleService,
    ShowService
  ]
})
export class ScheduleModule { }
