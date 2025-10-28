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
  @ViewChild('mediaEl', { static: false }) mediaEl!: ElementRef<HTMLAudioElement>;

  @Input() src!: string; // stream or file URL (audio only)
  @Input() autoplay = false;
  @Input() debug = false;
  @Input() forceNative = false; // when true, skip initializing Plyr (use native element)

  player?: any;
  hls?: any;

  ngAfterViewInit(): void {
    const el = this.mediaEl?.nativeElement;

    // lazy-load Plyr and hls.js when needed
    Promise.all([
      Plyr ? Promise.resolve(Plyr) : import('plyr').then(m => (Plyr = (m as any).default || m)),
      Hls ? Promise.resolve(Hls) : import('hls.js').then(m => (Hls = (m as any).default || m))
    ])
      .then(() => {
        // If consumer requests native playback for debugging, skip Plyr init
        this.setupPlayer(el, this.forceNative);
      })
      .catch(() => {
        // If dynamic import fails, fall back to native element
        this.setupPlayer(el, true);
      });
  }

  private setupPlayer(el: HTMLVideoElement | HTMLAudioElement, skipPlyr = false) {
    if (!el) return;

    // initialize HLS if needed
    if (this.src && (this.src.endsWith('.m3u8') || this.src.includes('.m3u8'))) {
      if (Hls && Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.src);
        this.hls.attachMedia(el as HTMLAudioElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (this.debug) console.info('HLS manifest parsed for', this.src);
          this.attachMediaListeners(el);
          if (!skipPlyr) this.initPlyr(el);
          if (this.autoplay) {
            (el as HTMLMediaElement)
              .play()
              .catch(err => this.debug && console.warn('Autoplay blocked or failed:', err));
          }
        });
      } else {
        // Safari native HLS or Hls not available
        this.setElementSource(el, this.src);
        this.attachMediaListeners(el);
        if (!skipPlyr) this.initPlyr(el);
        if (this.autoplay) {
          (el as HTMLMediaElement)
            .play()
            .catch(err => this.debug && console.warn('Autoplay blocked or failed:', err));
        }
      }
    } else {
      // progressive or non-HLS stream
      this.setElementSource(el, this.src);
      this.attachMediaListeners(el);
      if (!skipPlyr) this.initPlyr(el);
      if (this.autoplay) {
        (el as HTMLMediaElement)
          .play()
          .catch(err => this.debug && console.warn('Autoplay blocked or failed:', err));
      }
    }
  }

  /** Set src using a <source> node and call load() to (re)start fetching. */
  private setElementSource(el: HTMLAudioElement, src: string) {
    try {
      // remove existing children
      while (el.firstChild) el.removeChild(el.firstChild);

      const source = document.createElement('source');
      source.src = src;

      // For shoutcast/icy MP3-like endpoints, hint the MIME type
      if (/\.(mp3|mp2|aac|m4a)(\?|$)/i.test(src) || /icy|shoutcast|listen/.test(src)) {
        source.type = 'audio/mpeg';
      }

      el.appendChild(source);
      // some browsers require calling load() to start streaming
      if ((el as any).load) {
        (el as any).load();
      }

      if (this.debug) console.info('Set source on element', src);
    } catch (e) {
      // fallback to direct assignment
      try {
        (el as any).src = src;
      } catch (err) {
        this.debug && console.warn('Failed to set source', err);
      }
      this.debug && console.warn('Failed to set <source>; falling back to direct src assignment', e);
    }
  }

  private attachMediaListeners(el: HTMLAudioElement) {
    try {
      const m = el as HTMLMediaElement;
      const events = [
        'error',
        'stalled',
        'suspend',
        'waiting',
        'playing',
        'canplay',
        'canplaythrough',
        'loadedmetadata',
        'loadeddata',
        'progress',
        'emptied',
        'abort'
      ];

      events.forEach(ev => {
        m.addEventListener(ev, e => this.debug && console.info('media event', ev, { src: this.src, event: e }));
      });

      m.addEventListener('error', () => {
        const err = m.error;
        this.debug && console.error('Media error', err && err.code, err && (err as any).message);
      });
    } catch (e) {
      this.debug && console.warn('Could not attach media listeners', e);
    }
  }

  private initPlyr(el: HTMLAudioElement) {
    if (!Plyr) return;
    this.player = new Plyr(el as any, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      try {
        this.player.destroy();
      } catch (e) {
        // ignore
      }
      this.player = undefined;
    }

    if (this.hls) {
      try {
        this.hls.destroy();
      } catch (e) {
        // ignore
      }
      this.hls = undefined;
    }
  }
}
