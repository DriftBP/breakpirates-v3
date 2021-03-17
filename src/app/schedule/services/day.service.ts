import { Injectable } from '@angular/core';
import { Info } from 'luxon';

import { Day } from '../day';

@Injectable()
export class DayService {
  private daysOfWeek: Day[];

  constructor() {
    this.daysOfWeek = [1,2,3,4,5,6,7].map(d => {
      return {
        id: d,
        name: Info.weekdays()[d - 1]
      };
    });
  }

  days(): Day[] {
    return this.daysOfWeek;
  }

  dayName(dayId: number): string {
    const day = this.daysOfWeek.find((d: Day) => d.id === dayId);

    return day?.name;
  }
}
