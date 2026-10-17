import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DateTime, WeekdayNumbers } from 'luxon';
import { TranslatePipe } from '@ngx-translate/core';

import { ScheduleService } from '../../schedule/services/schedule.service';
import { ShowSummaryComponent } from '../../schedule/show-summary/show-summary.component';

@Component({
  selector: 'bp-todays-schedule',
  templateUrl: './todays-schedule.component.html',
  imports: [
    ShowSummaryComponent,
    TranslatePipe,
    AsyncPipe
  ]
})
export class TodaysScheduleComponent {
  readonly scheduleService = inject(ScheduleService);

  activeDayId: WeekdayNumbers;

  constructor() {
    this.activeDayId = DateTime.local().weekday;
  }
}
