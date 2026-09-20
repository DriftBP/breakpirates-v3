import { Component, viewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AppSettings } from '../../app-settings';

declare const MediaElementPlayer: unknown;

@Component({
    selector: 'bp-radio-player',
    templateUrl: './radio-player.component.html',
    styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent implements AfterViewInit {
  mediaPlayerElement = viewChild.required<ElementRef>('mediaPlayer');

  tuneInUrl = `${AppSettings.STREAM_URL_PRIMARY};`;
  public mediaPlayer: unknown;

  ngAfterViewInit(): void {
    void this.loadMediaPlayer();
  }

  async loadMediaPlayer(): Promise<void> {
    await import('mediaelement');

    this.mediaPlayer = new (MediaElementPlayer as new (element: HTMLElement, options: unknown) => unknown)(this.mediaPlayerElement().nativeElement, {
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
