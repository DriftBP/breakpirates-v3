import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DateTime } from 'luxon';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const todaysScheduleResolver: ResolveFn<Show[]> = () => {
  return inject(ScheduleService).shows(DateTime.local().weekday);
};
