import { Injectable } from '@angular/core';
import { Info } from 'luxon';

import { Day } from './day';
import { ScheduleModule } from './schedule.module';

@Injectable()
export class DayService {
  private daysOfWeek: Day[];

  public dateFormat = 'YYYY-MM-DD';
  public timeFormat = 'HH:mm:ss';

  constructor() {
    this.daysOfWeek = [];

    for (let i = 1; i <= 7; i++) {
      this.daysOfWeek.push({
        id: i,
        name: Info.weekdays()[i - 1]
      });
    }
  }

  days(): Day[] {
    return this.daysOfWeek;
  }

  dayName(dayId: number): string {
    const day = this.daysOfWeek.find((d: Day) => d.id === dayId);

    return day?.name;
  }
}
