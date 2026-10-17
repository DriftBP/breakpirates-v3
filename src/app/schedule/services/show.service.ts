import { Injectable } from '@angular/core';
import { DateTime, WeekdayNumbers } from 'luxon';

import { Show } from '../models/show';
import { AppSettings } from '../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  readonly timeFormat = 'HH:mm:ss';
  readonly showTimezone = AppSettings.SHOW_TIMEZONE;

  private getNextDate(show: Show): DateTime {
    const today = DateTime.local().setZone(this.showTimezone).weekday;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      return DateTime.local().setZone(this.showTimezone).set({weekday: show.day_id as WeekdayNumbers});
    } else {
      // otherwise, give me *next week's* instance of that same day
      return DateTime.local().setZone(this.showTimezone).plus({weeks: 1}).set({weekday: show.day_id as WeekdayNumbers});
    }
  }

  private getEndDate(startDate: DateTime, endTime: DateTime): DateTime {
    if (endTime.hour < startDate.hour) {
      // Ends the following day
      return startDate.plus({days: 1}).set({hour: endTime.hour, minute: endTime.minute});
    } else {
      return startDate.set({hour: endTime.hour, minute: endTime.minute});
    }
  }

  getDates(show: Show): { startDate: DateTime, endDate: DateTime } {
    const startTime = DateTime.fromFormat(show.start_time, this.timeFormat, { zone: this.showTimezone });
    const endTime = DateTime.fromFormat(show.end_time, this.timeFormat, { zone: this.showTimezone });

    const nextDate = this.getNextDate(show);

    // Set show time
    const startDate = DateTime.fromObject({
      year: nextDate.year,
      month: nextDate.month,
      day: nextDate.day,
      hour: startTime.hour,
      minute: startTime.minute,
      second: startTime.second
    }, { zone: this.showTimezone });

    const endDate = this.getEndDate(startDate, endTime);

    return { startDate: startDate, endDate: endDate };
  }
}
