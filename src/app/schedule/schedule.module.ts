import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ShowSummaryComponent } from './show-summary/show-summary.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DayService } from './services/day.service';
import { ScheduleService } from './services/schedule.service';
import { GenreListComponent } from './genre-list/genre-list.component';
import { HostListComponent } from './host-list/host-list.component';
import { ShowService } from './services/show.service';
import { NowLiveComponent } from './now-live/now-live.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ShowSummaryComponent,
    GenreListComponent,
    HostListComponent,
    NowLiveComponent
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
