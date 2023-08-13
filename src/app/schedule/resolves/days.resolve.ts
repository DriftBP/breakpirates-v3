import { Injectable } from '@angular/core';


import { DayService } from '../services/day.service';
import { ScheduleResolvesModule } from './schedule-resolves.module';
import { Day } from '../models/day';

@Injectable({
  providedIn: ScheduleResolvesModule
})
export class DaysResolve  {

  constructor(private dayService: DayService) {}

  resolve() {
    return this.dayService.days();
  }
}
