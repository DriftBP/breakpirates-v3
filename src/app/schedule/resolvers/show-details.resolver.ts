import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const ShowDetailsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Show> =>
    {
      const scheduleService = inject(ScheduleService);

      return scheduleService.show(parseInt(route.paramMap.get('id') ?? '', 10));
    }
