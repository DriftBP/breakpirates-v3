import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../services/schedule.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { Show } from '../models/show';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class ScheduleResolve  {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const dayId = parseInt(route.paramMap.get('id'), 10);

    return this.scheduleService.shows(dayId);
  }
}
