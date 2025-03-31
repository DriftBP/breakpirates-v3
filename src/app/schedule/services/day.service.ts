import { Injectable } from '@angular/core';
import { Info } from 'luxon';

import { Day } from '../models/day';

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

  dayById(dayId: number): Day | undefined {
    return this.daysOfWeek.find((d: Day) => d.id === dayId);
  }

  dayByName(name: string): Day | undefined {
    name = name.toLowerCase();

    return this.daysOfWeek.find((d: Day) => d.name.toLowerCase() === name);
  }

  dayName(dayId: number): string {
    const day = this.dayById(dayId);

    return day?.name ?? '';
  }
}
