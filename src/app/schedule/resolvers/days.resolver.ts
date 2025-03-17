import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { DayService } from '../services/day.service';
import { Day } from '../models/day';

export const daysResolver: ResolveFn<Day[]> = () => {
  return inject(DayService).days();
};
