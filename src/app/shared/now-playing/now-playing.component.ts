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
  private showProgressSubscription: Subscription;

  nowPlaying: Show;
  nowPlayingImage: string;
  isLiveShow = false;
  progress: number;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.nowPlayingSubscription = this.scheduleService.nowPlaying$.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      let imageFilename: string;

      if (nowPlaying?.id !== undefined) {
        this.isLiveShow = true;

        if (nowPlaying.image) {
          imageFilename = nowPlaying.image;
        }
      }

      if (!imageFilename) {
        // Use default
        imageFilename = 'bp-profile.jpg';
      }

      this.nowPlayingImage = 'url(' + AppSettings.ASSET_SHOW_IMAGE + imageFilename + ')';
    });

    this.showProgressSubscription = this.scheduleService.showProgress$.subscribe(progress => {
      this.progress = progress;
    });
  }



  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.showProgressSubscription) {
      this.showProgressSubscription.unsubscribe();
    }
  }

}
