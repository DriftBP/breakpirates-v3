import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { DayService } from '../services/day.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { Day } from '../day';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class DaysResolve implements Resolve<Day[]> {

  constructor(private dayService: DayService) {}

  resolve() {
    return this.dayService.days();
  }
}
