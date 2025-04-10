import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { ScheduleService } from '../services/schedule.service';
import { Show } from '../models/show';

export const showDetailsResolver: ResolveFn<Show> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ScheduleService).show(parseInt(route.paramMap.get('id') ?? '', 10));
};
