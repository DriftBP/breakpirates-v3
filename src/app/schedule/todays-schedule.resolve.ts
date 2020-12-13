import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import moment from 'moment';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Show } from './show';

@Injectable()
export class TodaysScheduleResolve implements Resolve<Show[]> {

  constructor(private scheduleService: ScheduleService) {}

  resolve() {
    const dayId = moment().isoWeekday();

    return this.scheduleService.shows(dayId);
  }
}
