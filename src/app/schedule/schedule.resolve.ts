import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Show } from './show';

@Injectable()
export class ScheduleResolve implements Resolve<Show[]> {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const dayId = parseInt(route.paramMap.get('id'), 10);

    return this.scheduleService.shows(dayId);
  }
}
