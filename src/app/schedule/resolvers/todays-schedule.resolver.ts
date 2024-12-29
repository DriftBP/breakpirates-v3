import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const TodaysScheduleResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Show[]> =>
    {
      const scheduleService = inject(ScheduleService);

      const dayId = DateTime.local().weekday;

    return scheduleService.shows(dayId);
    }
