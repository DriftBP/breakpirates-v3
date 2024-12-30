import { Component, viewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppSettings } from '../../app-settings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MediaElementPlayer: any;

@Component({
  selector: 'bp-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent implements AfterViewInit {
  mediaPlayerElement = viewChild.required<ElementRef>('mediaPlayer');

  tuneInUrl = AppSettings.STREAM_URL_PRIMARY;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mediaPlayer: any;

  ngAfterViewInit() {
    this.loadMediaPlayer();
  }

  loadMediaPlayer() {
    this.mediaPlayer = new MediaElementPlayer(this.mediaPlayerElement().nativeElement, {
      iconSprite: 'assets/mejs-controls.svg',
      alwaysShowControls: true,
      stretching: 'responsive',
      features: [
        'playpause',
        'current',
        'volume'
      ]
    });
  }
}
