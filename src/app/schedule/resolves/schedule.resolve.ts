import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../../shared/services/schedule/schedule.service';
import { ScheduleResolvesModule } from '../schedule-resolves.module';
import { Show } from '../show';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class ScheduleResolve implements Resolve<Show[]> {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const dayId = parseInt(route.paramMap.get('id'), 10);

    return this.scheduleService.shows(dayId);
  }
}
