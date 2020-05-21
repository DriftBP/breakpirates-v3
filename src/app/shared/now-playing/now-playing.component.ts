import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Show } from '../../schedule/show';
import { ScheduleService } from '../services/schedule.service';
import { ServerInfo } from '../services/server-info';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  private nowPlayingSubscription: Subscription;
  private serverInfoSubscription: Subscription;

  nowPlaying: Show;
  nowPlayingImage: string;
  isLiveShow = false;
  serverInfo: ServerInfo;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.nowPlayingSubscription = this.scheduleService.nowPlaying.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      if (nowPlaying?.id !== undefined) {
        this.isLiveShow = true;

        if (nowPlaying.image) {
          this.nowPlayingImage = 'url(' + AppSettings.ASSET_PROFILE_IMAGE + nowPlaying.image + ')';
        }
      }
    });

    this.serverInfoSubscription = this.scheduleService.serverInfo.subscribe(serverInfo => this.serverInfo = serverInfo);
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
