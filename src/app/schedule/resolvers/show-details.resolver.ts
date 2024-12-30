import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const ShowDetailsResolver: ResolveFn<Observable<Show>> =
  (route: ActivatedRouteSnapshot): Observable<Show> =>
    {
      const scheduleService = inject(ScheduleService);

      return scheduleService.show(parseInt(route.paramMap.get('id') ?? '', 10));
    }
