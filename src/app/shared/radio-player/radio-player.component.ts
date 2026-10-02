import { DOCUMENT } from '@angular/common';
import { Component, viewChild, ElementRef, AfterViewInit, ViewEncapsulation, inject } from '@angular/core';

import { AppSettings } from '../../app-settings';

declare const MediaElementPlayer: unknown;

@Component({
    selector: 'bp-radio-player',
    templateUrl: './radio-player.component.html',
    styleUrls: ['./radio-player.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RadioPlayerComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  mediaPlayerElement = viewChild.required<ElementRef>('mediaPlayer');

  tuneInUrl = `${AppSettings.STREAM_URL_PRIMARY};`;
  public mediaPlayer: unknown;

  ngAfterViewInit(): void {
    void this.loadMediaPlayer();
  }

  async loadMediaPlayer(): Promise<void> {
    await this.loadMediaElementStyles();
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

  private loadMediaElementStyles(): Promise<void> {
    const existingLink = this.document.getElementById('mediaelement-styles') as HTMLLinkElement | null;

    if (existingLink) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = this.document.createElement('link');
      link.id = 'mediaelement-styles';
      link.rel = 'stylesheet';
      link.href = 'assets/mediaelementplayer.min.css';
      link.onload = () => resolve();
      link.onerror = () => reject(new Error('Failed to load MediaElement styles'));
      this.document.head.appendChild(link);
    });
  }
}
