import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../../schedule/services/schedule.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { Show } from '../models/show';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class ShowDetailsResolve  {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.scheduleService.show(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}
