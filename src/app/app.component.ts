import { Component, Renderer2, OnDestroy, HostBinding, OnInit, computed, Signal, DOCUMENT, inject } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterOutlet
} from '@angular/router';

import { Subscription } from 'rxjs';

import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { ThemeService } from './shared/services/theme/theme.service';
import { Theme } from './shared/services/theme/theme';
import { AppSettings } from './app-settings';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PlyrPlayerComponent } from './players/plyr-player/plyr-player.component';

@Component({
  selector: 'bp-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    LoadingSpinnerComponent,
    PlyrPlayerComponent
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private renderer2 = inject(Renderer2);
  private _document = inject<Document>(DOCUMENT);
  private googleAnalyticsService = inject(GoogleAnalyticsService);
  private themeService = inject(ThemeService);

  @HostBinding('attr.data-theme') get theme() { return this.currentTheme(); }

  private eventsSubscription: Subscription;
  private currentTheme: Signal<Theme>;

  loading: boolean = false;

  constructor () {
    this.eventsSubscription = this.router.events.subscribe(event => this.processEvent(event));
    this.currentTheme = computed(() => {
      return this.themeService.currentTheme();
    });
  }

  private processEvent(event: Event) {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }

      case event instanceof NavigationEnd: {
        const e = event as NavigationEnd;
        this.googleAnalyticsService.trackPageHit(e.urlAfterRedirects);

        this.loading = false;
        break;
      }

      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnInit(): void {
    // Google Adsense script
    const adwordsScript = this.renderer2.createElement('script');
    adwordsScript.async = 'async';
    adwordsScript.crossorigin = 'anonymous';
    adwordsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + AppSettings.ADSENSE_CLIENT;

    const adsByGoogleScript = this.renderer2.createElement('script');
    adsByGoogleScript.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';

    this.renderer2.appendChild(this._document.body, adwordsScript);
    this.renderer2.appendChild(this._document.body, adsByGoogleScript);
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
