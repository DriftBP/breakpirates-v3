import { Injectable } from '@angular/core';
import { DateTime, Interval } from 'luxon';

import { Show } from '../models/show';

@Injectable()
export class ShowService {
  timeFormat = 'HH:mm:ss';

  private getNextDate(show: Show): DateTime {
    const today = DateTime.local().weekday;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      return DateTime.local().set({weekday: show.day_id});
    } else {
      // otherwise, give me *next week's* instance of that same day
      return DateTime.local().plus({weeks: 1}).set({weekday: show.day_id});
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
    var progress = 0;

    if (show) {
      const startTime = DateTime.fromFormat(show.start_time, this.timeFormat);
      const endTime = DateTime.fromFormat(show.end_time, this.timeFormat);
      const showLengthMinutes = Interval.fromDateTimes(startTime, endTime).toDuration('minutes').minutes;
      const minutesCompleted = Interval.fromDateTimes(startTime, DateTime.now()).toDuration('minutes').minutes;

      progress = (100 / showLengthMinutes) * minutesCompleted;
    }

    return progress;
  }

  getDates(show: Show): { startDate: DateTime, endDate: DateTime } {
    const startTime = DateTime.fromFormat(show.start_time, this.timeFormat);
    const endTime = DateTime.fromFormat(show.end_time, this.timeFormat);

    const nextDate = this.getNextDate(show);

    // Set show time
    const startDate = DateTime.local(nextDate.year, nextDate.month, nextDate.day, startTime.hour, startTime.minute, startTime.second);

    const endDate = this.getEndDate(startDate, endTime);

    return { startDate: startDate, endDate: endDate };
  }
}
