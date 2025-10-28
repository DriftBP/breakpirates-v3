import { Component, ElementRef, AfterViewInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use dynamic imports for plyr and hls to avoid test-time import errors when packages
// are not installed in the test environment. Typings provided in src/typings/plyr-hls.d.ts
let Plyr: any = undefined;

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

    // lazy-load Plyr when needed; if import fails, fall back to native element
    (Plyr ? Promise.resolve(Plyr) : import('plyr').then(m => (Plyr = (m as any).default || m)))
      .then(() => this.setupPlayer(el, this.forceNative))
      .catch(() => this.setupPlayer(el, true));
  }

  private setupPlayer(el: HTMLVideoElement | HTMLAudioElement, skipPlyr = false) {
    if (!el) return;

    // Always set the source on the audio element and initialize listeners/player.
    this.setElementSource(el, this.src);
    this.attachMediaListeners(el);
    if (!skipPlyr) this.initPlyr(el);
    if (this.autoplay) {
      (el as HTMLMediaElement).play().catch(err => this.debug && console.warn('Autoplay blocked or failed:', err));
    }
  }

  /** Set src using a <source> node and call load() to (re)start fetching. */
  private setElementSource(el: HTMLAudioElement, src: string) {
    try {
      // Heuristic: for Shoutcast/ICY/listen endpoints or URLs without a file extension,
      // use direct assignment on the audio element. Some servers deliver non-standard
      // responses which work better when using audio.src directly.
      const looksLikeStream = /icy|shoutcast|listen|stream|\/;/.test(src) || !/\.[a-z0-9]{2,5}(\?|$)/i.test(src);

      if (looksLikeStream) {
        try {
          (el as any).src = src;
          if ((el as any).load) (el as any).load();
          if (this.debug) console.info('Assigned direct src on element (stream heuristic)', src);
          return;
        } catch (innerErr) {
          this.debug && console.warn('Direct src assignment failed, will try <source> fallback', innerErr);
        }
      }

      // Fallback: create a <source> element for regular audio files
      while (el.firstChild) el.removeChild(el.firstChild);
      const source = document.createElement('source');
      source.src = src;

      // For MP3-like endpoints, hint the MIME type
      if (/\.(mp3|mp2|aac|m4a)(\?|$)/i.test(src)) {
        source.type = 'audio/mpeg';
      }

      el.appendChild(source);
      if ((el as any).load) {
        (el as any).load();
      }

      if (this.debug) console.info('Set <source> on element', src);
    } catch (e) {
      // Final fallback to direct assignment
      try {
        (el as any).src = src;
        if ((el as any).load) (el as any).load();
        this.debug && console.info('Fallback: assigned direct src on element', src);
      } catch (err) {
        this.debug && console.warn('Failed to set source', err);
      }
      this.debug && console.warn('Failed to set <source>; attempted direct src fallback', e);
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
