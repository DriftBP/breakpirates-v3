import { Injectable } from '@angular/core';
import { DateTime, Duration, Interval } from 'luxon';

import { Show } from '../models/show';

@Injectable()
export class ShowService {

  timeFormat = 'HH:mm:ss';

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
    const today = DateTime.local().weekday;
    const startTime = DateTime.fromFormat(show.start_time, this.timeFormat);
    const endTime = DateTime.fromFormat(show.end_time, this.timeFormat);

    let nextDate: DateTime;
    let endDate: DateTime;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      nextDate = DateTime.local().set({weekday: show.day_id});
    } else {
      // otherwise, give me *next week's* instance of that same day
      nextDate = DateTime.local().plus({weeks: 1}).set({weekday: show.day_id});
    }

    // Set show time
    const startDate = DateTime.local(nextDate.year, nextDate.month, nextDate.day, startTime.hour, startTime.minute, startTime.second);

    if (endTime.hour < startTime.hour) {
      // Ends the following day
      endDate = startDate.plus({days: 1}).set({hour: endTime.hour, minute: endTime.minute});
    } else {
      endDate = startDate.set({hour: endTime.hour, minute: endTime.minute});
    }

    return { startDate: startDate, endDate: endDate };
  }
}
