import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges() {
    if (this.show !== undefined) {
      this.nowPlayingSubscription = this.scheduleService.nowPlaying.subscribe(nowPlaying => this.onNow = nowPlaying?.id === this.show.id);

        if (this.displayDay) {
          this.dayName = this.scheduleService.dayName(this.show.day_id);
        }
    }
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }
}
