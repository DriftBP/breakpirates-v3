import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DateTime, Interval } from 'luxon';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../services/schedule/schedule.service';
import { ServerInfo } from '../services/schedule/server-info';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  private nowPlayingSubscription: Subscription;
  private serverInfoSubscription: Subscription;
  private progressTimerSubscription: Subscription;
  private strokeLength = 295.3;

  nowPlaying: Show;
  nowPlayingImage: string;
  isLiveShow = false;
  serverInfo: ServerInfo;
  progressStyle = '';

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.nowPlayingSubscription = this.scheduleService.nowPlaying.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      let imageFilename: string;

      if (nowPlaying?.id !== undefined) {
        this.isLiveShow = true;

        if (nowPlaying.image) {
          imageFilename = nowPlaying.image;
        }

        this.progressTimerSubscription = timer(0, 60000).subscribe(() => {
          this.progressStyle = this.getProgressStyle(this.nowPlaying, this.strokeLength);
        });
      }

      if (!imageFilename) {
        // Use default
        imageFilename = 'bp-profile.jpg';
      }

      this.nowPlayingImage = 'url(' + AppSettings.ASSET_SHOW_IMAGE + imageFilename + ')';
    });

    this.serverInfoSubscription = this.scheduleService.serverInfo.subscribe(serverInfo => this.serverInfo = serverInfo);
  }

  private getProgressStyle(show: Show, strokeLength: number): string {
    var progressStyle = '';

    if (show) {
      const startTime = DateTime.fromFormat(show.start_time, this.scheduleService.timeFormat);
      const endTime = DateTime.fromFormat(show.end_time, this.scheduleService.timeFormat);
      const showLengthMinutes = Interval.fromDateTimes(startTime, endTime).toDuration('minutes').minutes;
      const minutesCompleted = Interval.fromDateTimes(startTime, DateTime.now()).toDuration('minutes').minutes;

      const timeDone = (this.strokeLength / showLengthMinutes) * minutesCompleted;

      progressStyle = `stroke-dasharray:${timeDone} ${strokeLength};`;
    }

    return progressStyle;
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.serverInfoSubscription) {
      this.serverInfoSubscription.unsubscribe();
    }

    if (this.progressTimerSubscription) {
      this.progressTimerSubscription.unsubscribe();
    }
  }

}
