import { Component, OnInit, computed, Signal, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { AppSettings } from '../../app-settings';
import { SortOrder } from '../pipes/sort-order';
import { ProgressIndicatorComponent } from '../progress-indicator/progress-indicator.component';
import { RadioPlayerComponent } from '../radio-player/radio-player.component';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { TimePipe } from '../pipes/time.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { ShoutcastService } from './shoutcast.service';

@Component({
    selector: 'bp-now-playing',
    templateUrl: './now-playing.component.html',
    styleUrls: ['./now-playing.component.scss'],
    imports: [
      CommonModule,
      RouterModule,
      FontAwesomeModule,
      ProgressIndicatorComponent,
      RadioPlayerComponent,
      TranslatePipe,
      SortByPipe,
      TimePipe,
      SafePipe,
      HttpClientModule
    ]
})
export class NowPlayingComponent implements OnInit {
  nowPlaying: Signal<Show | null>;
  nowPlayingImage: Signal<string>;
  isLiveShow: Signal<boolean>;
  showRadioPlayer = false;
  currentTrack = signal<string>('');

  faExternalLink = faExternalLink;

  order = SortOrder.Ascending;

  constructor(
    public readonly scheduleService: ScheduleService,
    private shoutcast: ShoutcastService
  ) {
    // HTML5 audio player will only work over HTTP
    this.showRadioPlayer = location.protocol.toLowerCase() === 'http:';
    // Fetch current track in injection context
    effect(() => {
      this.shoutcast.getCurrentTrack().subscribe(track => {
        this.currentTrack.set(track);
      });
    });
  }

  ngOnInit() {
    this.nowPlaying = computed(() => {
      return this.scheduleService.nowPlaying();
    });

    this.isLiveShow = computed(() => {
      const nowPlaying = this.scheduleService.nowPlaying();

      return nowPlaying?.id !== undefined;
    });

    this.nowPlayingImage = computed(() => {
      const nowPlaying = this.scheduleService.nowPlaying();

      let imageFilename: string | undefined;

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

    window.open(url, 'player', params)?.focus();
  }
}
