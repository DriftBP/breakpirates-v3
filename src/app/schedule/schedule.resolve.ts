import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import moment from 'moment';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Show } from './show';

@Injectable()
export class ScheduleResolve implements Resolve<Show[]> {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let dayId = parseInt(route.paramMap.get('id'), 10);

    // Default to today if not specified
    if (!dayId) {
      dayId = moment().isoWeekday();
    }

    return this.scheduleService.shows(dayId);
  }
}
