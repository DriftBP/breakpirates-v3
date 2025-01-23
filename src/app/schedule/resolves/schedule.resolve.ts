import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../services/schedule.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { DayService } from '../services/day.service';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class ScheduleResolve  {

  constructor(
    private scheduleService: ScheduleService,
    private dayService: DayService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const dayName = route.paramMap.get('day');

    const dayId = this.dayService.dayByName(dayName)?.id ?? 0;

    return this.scheduleService.shows(dayId);
  }
}
