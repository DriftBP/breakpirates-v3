import { Injectable } from '@angular/core';

import { DateTime } from 'luxon';

import { ScheduleService } from '../../schedule/services/schedule.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { Show } from '../models/show';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class TodaysScheduleResolve  {

  constructor(private scheduleService: ScheduleService) {}

  resolve() {
    const dayId = DateTime.local().weekday;

    return this.scheduleService.shows(dayId);
  }
}
