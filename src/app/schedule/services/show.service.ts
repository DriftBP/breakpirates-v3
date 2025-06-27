import { Injectable } from '@angular/core';
import { DateTime, Interval, WeekdayNumbers } from 'luxon';

import { Show } from '../models/show';
import { AppSettings } from '../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  readonly timeFormat = 'HH:mm:ss';
  readonly ukTimeZone = AppSettings.SHOW_TIMEZONE;

  private getNextDate(show: Show): DateTime {
    const today = DateTime.local().setZone(this.ukTimeZone).weekday;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      return DateTime.local().setZone(this.ukTimeZone).set({weekday: show.day_id as WeekdayNumbers});
    } else {
      // otherwise, give me *next week's* instance of that same day
      return DateTime.local().setZone(this.ukTimeZone).plus({weeks: 1}).set({weekday: show.day_id as WeekdayNumbers});
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

  getShowProgress(show: Show): number {
    let progress = 0;

    if (show) {
      // Parse show times as UK time
      const startTime = DateTime.fromFormat(show.start_time, this.timeFormat, { zone: this.ukTimeZone });
      const endTime = DateTime.fromFormat(show.end_time, this.timeFormat, { zone: this.ukTimeZone });
      const now = DateTime.now().setZone(this.ukTimeZone);
      const showLengthMinutes = Interval.fromDateTimes(startTime, endTime).toDuration('minutes').minutes;
      const minutesCompleted = Interval.fromDateTimes(startTime, now).toDuration('minutes').minutes;

      progress = (100 / showLengthMinutes) * minutesCompleted;
      // Clamp between 0 and 100
      progress = Math.max(0, Math.min(100, progress));
    }

    return progress;
  }

  getDates(show: Show): { startDate: DateTime, endDate: DateTime } {
    const startTime = DateTime.fromFormat(show.start_time, this.timeFormat, { zone: this.ukTimeZone });
    const endTime = DateTime.fromFormat(show.end_time, this.timeFormat, { zone: this.ukTimeZone });

    const nextDate = this.getNextDate(show);

    // Set show time
    const startDate = DateTime.fromObject({
      year: nextDate.year,
      month: nextDate.month,
      day: nextDate.day,
      hour: startTime.hour,
      minute: startTime.minute,
      second: startTime.second
    }, { zone: this.ukTimeZone });

    const endDate = this.getEndDate(startDate, endTime);

    return { startDate: startDate, endDate: endDate };
  }
}
