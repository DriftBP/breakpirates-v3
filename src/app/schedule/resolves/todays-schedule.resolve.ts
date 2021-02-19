import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DateTime } from 'luxon';
import { ScheduleResolvesModule } from '../schedule-resolves.module';

import { ScheduleService } from '../../shared/services/schedule/schedule.service';
import { Show } from '../show';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class TodaysScheduleResolve implements Resolve<Show[]> {

  constructor(private scheduleService: ScheduleService) {}

  resolve() {
    const dayId = DateTime.local().weekday;

    return this.scheduleService.shows(dayId);
  }
}
