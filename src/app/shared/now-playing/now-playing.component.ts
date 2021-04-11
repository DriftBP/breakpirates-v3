import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../services/schedule/schedule.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  private nowPlayingSubscription: Subscription;
  private serverInfoSubscription: Subscription;
  private strokeLength = 295.3;

  nowPlaying: Show;
  nowPlayingImage: string;
  isLiveShow = false;
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

        this.progressStyle = this.getProgressStyle(nowPlaying, this.strokeLength);
      }

      if (!imageFilename) {
        // Use default
        imageFilename = 'bp-profile.jpg';
      }

      this.nowPlayingImage = 'url(' + AppSettings.ASSET_SHOW_IMAGE + imageFilename + ')';
    });
  }

  private getProgressStyle(show: Show, strokeLength: number): string {
    const progress = this.scheduleService.getShowProgress(show);

    const timeDone = (strokeLength / 100) * progress;

    return `stroke-dasharray:${timeDone} ${strokeLength};`;
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.serverInfoSubscription) {
      this.serverInfoSubscription.unsubscribe();
    }
  }

}
