import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnDestroy {

  private nowPlayingSubscription: Subscription;

  nowPlaying?: Show | null;
  nowPlayingImage = '';
  isLiveShow = false;
  showRadioPlayer = false;

  faExternalLink = faExternalLink;

  constructor(
    public readonly scheduleService: ScheduleService
  ) {
    // HTML5 audio player will only work over HTTP
    this.showRadioPlayer = location.protocol.toLowerCase() === 'http:';

    this.nowPlayingSubscription = this.scheduleService.nowPlaying$.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      let imageFilename: string | undefined;

      if (nowPlaying?.id) {
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

  openPopupPlayer() {
    const port = location.port ? `:${location.port}` : '';
    const url = `http://${location.hostname}${port}/player`;
    const params = `toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=100`;

    window.open(url, 'player', params)
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }
}
