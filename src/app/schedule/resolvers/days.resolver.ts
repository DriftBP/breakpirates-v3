import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { from, Observable } from 'rxjs';

import { DayService } from '../services/day.service';
import { Day } from '../models/day';

export const DaysResolver: ResolveFn<Observable<Day[]>> =
  (): Observable<Day[]> =>
    {
      const dayService = inject(DayService);

      return from([dayService.days()]);
    }
