import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { DayService } from './day.service';
import { Day } from './day';

@Injectable()
export class DaysResolve implements Resolve<Day[]> {

  constructor(private dayService: DayService) {}

  resolve() {
    return this.dayService.days();
  }
}
