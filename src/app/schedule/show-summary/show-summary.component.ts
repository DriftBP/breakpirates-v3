import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import moment from 'moment';

import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';

@Component({
  selector: 'app-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss']
})
export class ShowSummaryComponent implements OnChanges, OnDestroy {
  @Input() show: Show;
  @Input() displayDay = false;

  private nowPlayingSubscription: Subscription;
  private dateFormat = 'YYYY-MM-DD';
  private timeFormat = 'HH:mm';

  onNow = false;
  dayName: string;
  nextDate: string;
  endDate: string;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges() {
    if (this.show !== undefined) {
      this.nowPlayingSubscription = this.scheduleService.nowPlaying.subscribe(nowPlaying => this.onNow = nowPlaying?.id === this.show.id);

      if (this.displayDay) {
        this.dayName = this.scheduleService.dayName(this.show.day_id);
      }

      // Next show date
      const nextDate = this.getNextDate(this.show);
      this.nextDate = moment(nextDate).format();

      const startTime = moment(this.show.start_time, this.timeFormat);
      const endTime = moment(this.show.end_time, this.timeFormat);

      if (endTime.hours() < startTime.hours()) {
        // Ends the following day
        this.endDate = nextDate.add(1, 'days').set({hour: endTime.hours(), minute: endTime.minutes()}).format();
      } else {
        this.endDate = nextDate.set({hour: endTime.hours(), minute: endTime.minutes()}).format();
      }
    }
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }

  private getNextDate(show: Show): moment.Moment {
    const today = moment().isoWeekday();
    let nextDate: moment.Moment;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      nextDate = moment().isoWeekday(show.day_id);
    } else {
      // otherwise, give me *next week's* instance of that same day
      nextDate = moment().add(1, 'weeks').isoWeekday(show.day_id);
    }

    // Set show time
    const nextTime = moment(show.start_time, this.timeFormat);

    const format = nextDate.format(this.dateFormat) + ' ' + nextTime.format(this.timeFormat);

    return moment(format);
  }
}
