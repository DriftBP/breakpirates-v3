import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
// Use dynamic imports for plyr and hls to avoid test-time import errors when packages
// are not installed in the test environment. Typings provided in src/typings/plyr-hls.d.ts
let Plyr: any = undefined;
let Hls: any = undefined;

@Component({
  selector: 'bp-plyr-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plyr-player.component.html',
  styleUrls: ['./plyr-player.component.scss']
})
export class PlyrPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mediaEl', { static: false }) mediaEl!: ElementRef<HTMLVideoElement | HTMLAudioElement>;
  @Input() src!: string;          // stream or file URL
  @Input() type: 'video'|'audio' = 'video';
  player?: any;
  hls?: any;

  ngAfterViewInit(): void {
    const el = this.mediaEl.nativeElement;

    // lazy-load Plyr and hls.js when needed
    Promise.all([
      Plyr ? Promise.resolve(Plyr) : import('plyr').then(m => Plyr = m.default || m),
      Hls ? Promise.resolve(Hls) : import('hls.js').then(m => Hls = m.default || m)
    ]).then(() => {
      this.setupPlayer(el);
    }).catch(() => {
      // If dynamic import fails (e.g., in minimal test environment), fall back to using
      // the native media element without Plyr. We still set src and let native controls work.
      this.setupPlayer(el, /*skipPlyr=*/true);
    });

  }

  private setupPlayer(el: HTMLVideoElement | HTMLAudioElement, skipPlyr = false) {
    // initialize HLS if needed
    if (this.src && (this.src.endsWith('.m3u8') || this.src.includes('.m3u8'))) {
      if (Hls && Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.src);
        this.hls.attachMedia(el as HTMLVideoElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (!skipPlyr) this.initPlyr(el);
        });
      } else {
        // Safari builtin HLS or Hls not available
        el.src = this.src;
        if (!skipPlyr) this.initPlyr(el);
      }
    } else {
      // normal file / progressive stream
      el.src = this.src;
      if (!skipPlyr) this.initPlyr(el);
    }
  }

  private initPlyr(el: HTMLVideoElement | HTMLAudioElement) {
    if (!Plyr) return;
    this.player = new Plyr(el as any, {
      // set options here, e.g. controls: ['play','progress','volume','mute','fullscreen']
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
      this.player = undefined;
    }
    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }
  }
}
