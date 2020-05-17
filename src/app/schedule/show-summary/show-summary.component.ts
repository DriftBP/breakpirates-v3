import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { Host } from '../../profile/host';
import { ScheduleService } from '../../shared/services/schedule.service';
import { Genre } from '../../music/genre';

@Component({
  selector: 'app-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss']
})
export class ShowSummaryComponent implements OnChanges, OnDestroy {
  @Input() show: Show;
  @Input() displayDay = false;

  private nowPlayingSubscription: Subscription;
  private hostsSubscription: Subscription;
  private genresSubscription: Subscription;

  hosts: Host[];
  genres: Genre[];
  onNow = false;
  dayName: string;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges() {
    if (this.show !== undefined) {
      this.nowPlayingSubscription = this.scheduleService.nowPlaying.subscribe(nowPlaying => this.onNow = nowPlaying?.id === this.show.id);

      this.hostsSubscription = this.scheduleService.showHosts(this.show.id)
        .subscribe(hosts => this.hosts = hosts);

      this.genresSubscription = this.scheduleService.showGenres(this.show.id)
        .subscribe(genres => this.genres = genres);

        if (this.displayDay) {
          this.dayName = this.scheduleService.dayName(this.show.day_id);
        }
    }
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.hostsSubscription) {
      this.hostsSubscription.unsubscribe();
    }

    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }
}
