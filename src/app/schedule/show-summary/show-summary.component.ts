import { Component, Input, OnChanges } from '@angular/core';

import { Show } from '../show';
import { Host } from '../../profile/host';
import { ScheduleService } from '../../shared/services/schedule.service';
import { Genre } from '../../music/genre';

@Component({
  selector: 'app-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss']
})
export class ShowSummaryComponent implements OnChanges {
  @Input() show: Show;
  @Input() displayDay = false;

  dayName: string;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  hosts: Host[];
  genres: Genre[];
  onNow = false;

  ngOnChanges() {
    if (this.show !== undefined) {
      this.scheduleService.nowPlaying.subscribe(nowPlaying => this.onNow = nowPlaying?.id === this.show.id);

      this.scheduleService.showHosts(this.show.id)
        .subscribe(hosts => this.hosts = hosts);

      this.scheduleService.showGenres(this.show.id)
        .subscribe(genres => this.genres = genres);

        if (this.displayDay) {
          this.dayName = this.scheduleService.dayName(this.show.day_id);
        }
    }
  }
}
