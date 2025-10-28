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
  @Input() autoplay = false;
  @Input() debug = false;
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
          if (this.debug) console.info('HLS manifest parsed for', this.src);
          this.attachMediaListeners(el);
          if (!skipPlyr) this.initPlyr(el);
          if (this.autoplay) {
            // attempt to play; browsers may block autoplay without user gesture
            (el as HTMLMediaElement).play().catch(err => {
              if (this.debug) console.warn('Autoplay blocked or failed:', err);
            });
          }
        });
      } else {
        // Safari builtin HLS or Hls not available
        this.setElementSource(el, this.src);
        this.attachMediaListeners(el);
        if (!skipPlyr) this.initPlyr(el);
        if (this.autoplay) {
          (el as HTMLMediaElement).play().catch(err => {
            if (this.debug) console.warn('Autoplay blocked or failed:', err);
          });
        }
      }
    } else {
      // normal file / progressive stream
      this.setElementSource(el, this.src);
      this.attachMediaListeners(el);
      if (!skipPlyr) this.initPlyr(el);
      if (this.autoplay) {
        (el as HTMLMediaElement).play().catch(err => {
          if (this.debug) console.warn('Autoplay blocked or failed:', err);
        });
      }
    }
  }

  /**
   * Set src on media element using a <source> node and call load().
   * This helps when dealing with streaming endpoints (Shoutcast/ICY) which
   * sometimes require explicit source elements and load() to start fetching.
   */
  private setElementSource(el: HTMLVideoElement | HTMLAudioElement, src: string) {
    try {
      // remove existing sources
      while (el.firstChild) el.removeChild(el.firstChild);

      const source = document.createElement('source');
      source.src = src;

      // If it looks like an ICY/Shoutcast stream, set a common MIME type
      if (/\.(mp3|mp2|aac|m4a)(\?|$)/i.test(src) || /icy|shoutcast|listen/.test(src)) {
        source.type = 'audio/mpeg';
      }

      el.appendChild(source);
      // instruct the element to (re)load the new source
      // some browsers require calling load() to start streaming
      el.load();
      if (this.debug) console.info('Set source on element', src);
    } catch (e) {
      // fallback to direct assignment
      el.src = src;
      if (this.debug) console.warn('Failed to set <source>; falling back to direct src assignment', e);
    }
  }

  private attachMediaListeners(el: HTMLVideoElement | HTMLAudioElement) {
    try {
      const m = el as HTMLMediaElement;
      const events = ['error','stalled','suspend','waiting','playing','canplay','canplaythrough','loadedmetadata','loadeddata','progress','emptied','abort'];
      events.forEach(ev => {
        m.addEventListener(ev, (e) => {
          if (this.debug) console.info('media event', ev, { src: this.src, event: e });
        });
      });

      // log the media error object when it occurs
      m.addEventListener('error', () => {
        const err = m.error;
        if (err && this.debug) console.error('Media error', err.code, err.message || err);
      });
    } catch (e) {
      if (this.debug) console.warn('Could not attach media listeners', e);
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
