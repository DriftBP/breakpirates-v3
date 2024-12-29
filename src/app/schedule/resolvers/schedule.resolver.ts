import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const ScheduleResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Show[]> =>
    {
      const scheduleService = inject(ScheduleService);

      const dayId = parseInt(route.paramMap.get('id') ?? '', 10);

      return scheduleService.shows(dayId);
    }
