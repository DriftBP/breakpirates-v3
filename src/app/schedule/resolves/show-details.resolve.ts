import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../../schedule/services/schedule.service';

import { Show } from '../models/show';

@Injectable()
export class ShowDetailsResolve  {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.scheduleService.show(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}
