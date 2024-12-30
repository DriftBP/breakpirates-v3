import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const TodaysScheduleResolver: ResolveFn<Observable<Show[]>> =
  (): Observable<Show[]> =>
    {
      const scheduleService = inject(ScheduleService);

      const dayId = DateTime.local().weekday;

      return scheduleService.shows(dayId);
    }
