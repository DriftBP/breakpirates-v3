import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  private nowPlayingSubscription: Subscription;

  nowPlaying: Show;
  nowPlayingImage: string;
  isLiveShow = false;
  showRadioPlayer = false;

  constructor(
    public readonly scheduleService: ScheduleService
  ) {
    // HTML5 audio player will only work over HTTP
    this.showRadioPlayer = location.protocol.toLowerCase() === 'http:';
  }

  ngOnInit() {
    this.nowPlayingSubscription = this.scheduleService.nowPlaying$.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      let imageFilename: string;

      if (nowPlaying?.id !== undefined) {
        this.isLiveShow = true;

        if (nowPlaying.image) {
          imageFilename = nowPlaying.image;
        }
      } else {
        this.isLiveShow = false;
      }

      if (!imageFilename) {
        // Use default
        imageFilename = 'bp-profile.jpg';
      }

      this.nowPlayingImage = `url(${AppSettings.ASSET_SHOW_IMAGE}${imageFilename})`;
    });
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }
}
