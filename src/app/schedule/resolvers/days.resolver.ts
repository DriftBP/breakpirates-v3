import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';

import { DayService } from '../services/day.service';
import { Day } from '../models/day';

export const DaysResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Day[]> =>
    {
      const dayService = inject(DayService);

      return from([dayService.days()]);
    }
