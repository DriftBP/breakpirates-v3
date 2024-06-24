import { Component, OnInit, computed, Signal } from '@angular/core';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { AppSettings } from '../../app-settings';
import { SortOrder } from '../pipes/sort-order';

@Component({
  selector: 'bp-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {
  nowPlaying: Signal<Show>;
  nowPlayingImage: Signal<string>;
  isLiveShow: Signal<boolean>;
  showRadioPlayer = false;

  faExternalLink = faExternalLink;

  order = SortOrder.Ascending;

  constructor(
    public readonly scheduleService: ScheduleService
  ) {
    // HTML5 audio player will only work over HTTP
    this.showRadioPlayer = location.protocol.toLowerCase() === 'http:';
  }

  ngOnInit() {
    this.nowPlaying = computed(() => {
      return this.scheduleService.nowPlaying();
    });

    this.isLiveShow = computed(() => {
      const nowPlaying = this.scheduleService.nowPlaying();

      if (nowPlaying?.id !== undefined) {
        return true;
      } else {
        return false;
      }
    });

    this.nowPlayingImage = computed(() => {
      const nowPlaying = this.scheduleService.nowPlaying();

      let imageFilename: string;

      if (nowPlaying?.image) {
        imageFilename = nowPlaying.image;
      } else {
        // Use default
        imageFilename = 'bp-profile.jpg';
      }

      return `url(${AppSettings.ASSET_SHOW_IMAGE}${imageFilename})`;
    });
  }

  openPopupPlayer() {
    const hostname = location.hostname === 'localhost' ? location.hostname : 'listen.breakpirates.com';
    const port = location.port ? `:${location.port}` : '';
    const url = `http://${hostname}${port}/player`;
    const params = `toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=143`;

    window.open(url, 'player', params).focus();
  }
}
