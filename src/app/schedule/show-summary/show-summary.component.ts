import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { ScheduleService } from '../../shared/services/schedule/schedule.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-show-summary',
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
  showImage: string;

  constructor(
    private dayService: DayService,
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges() {
    if (this.show !== undefined) {
      this.nowPlayingSubscription = this.scheduleService.nowPlaying$
        .subscribe(nowPlaying => this.onNow = nowPlaying?.id === this.show.id);

      if (this.displayDay) {
        this.dayName = this.dayService.dayName(this.show.day_id);
      }

      const { startDate, endDate } = this.scheduleService.getDates(this.show);

      this.nextDate = startDate.toISO();
      this.endDate = endDate.toISO();

      if (this.show.image) {
        this.showImage = 'url(' + AppSettings.ASSET_SHOW_IMAGE + this.show.image + ')';
      }
    }
  }

  scrollToPlayer() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }
}
