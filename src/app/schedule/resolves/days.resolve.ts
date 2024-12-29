import { Injectable } from '@angular/core';

import { DayService } from '../services/day.service';

@Injectable()
export class DaysResolve  {

  constructor(private dayService: DayService) {}

  resolve() {
    return this.dayService.days();
  }
}
