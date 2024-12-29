import { Injectable } from '@angular/core';

import { DateTime } from 'luxon';

import { ScheduleService } from '../../schedule/services/schedule.service';

import { Show } from '../models/show';

@Injectable()
export class TodaysScheduleResolve  {

  constructor(private scheduleService: ScheduleService) {}

  resolve() {
    const dayId = DateTime.local().weekday;

    return this.scheduleService.shows(dayId);
  }
}
