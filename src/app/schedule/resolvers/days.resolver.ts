import { inject } from '@angular/core';

import { DayService } from '../services/day.service';
import { Day } from '../models/day';
import { ResolveFn } from '@angular/router';

export const daysResolver: ResolveFn<Day[]> = () => {
  return inject(DayService).days();
};
