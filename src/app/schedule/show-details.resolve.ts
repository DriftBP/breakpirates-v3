import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Show } from './show';

@Injectable()
export class ShowDetailsResolve implements Resolve<Show> {

  constructor(private scheduleService: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.scheduleService.show(parseInt(route.paramMap.get('id'), 10));
  }
}
