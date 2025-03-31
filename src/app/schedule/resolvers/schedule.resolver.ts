import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { ScheduleService } from '../services/schedule.service';
import { DayService } from '../services/day.service';
import { Show } from '../models/show';

export const scheduleResolver: ResolveFn<Show[]> = (
  route: ActivatedRouteSnapshot
) => {
  const dayName = route.paramMap.get('day');

  let dayId = 0;

  if (dayName) {
    dayId = inject(DayService).dayByName(dayName)?.id ?? 0;
  }

  return inject(ScheduleService).shows(dayId);
};
