import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppSettings } from '../../app-settings';

declare var MediaElementPlayer;

@Component({
  selector: 'bp-radio-player',
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent implements AfterViewInit {
  @ViewChild('mediaPlayer') mediaPlayerElement: ElementRef;

  tuneInUrl = AppSettings.STREAM_URL_PRIMARY;
  public mediaPlayer;

  ngAfterViewInit() {
    this.loadMediaPlayer();
  }

  loadMediaPlayer() {
    this.mediaPlayer = new MediaElementPlayer(this.mediaPlayerElement.nativeElement, {
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
