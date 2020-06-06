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

      // Next show start date
      this.nextDate = this.scheduleService.getNextDate(this.show).format();

      // Next show end date
      this.endDate = this.scheduleService.getEndDate(this.show).format();
    }
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }
}
