import { Component, Renderer2, Inject, OnDestroy } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { GoogleAnalyticsService } from './shared/services/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private eventsSubscription: Subscription;

  loading: boolean;

  constructor (
    private router: Router,
    private translate: TranslateService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    translate.setDefaultLang('en');

    this.eventsSubscription = this.router.events.subscribe((event: Event) => {
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
    });

    // Google Adsense script
    const adwordsScript = this._renderer2.createElement('script');
    adwordsScript.async = 'async';
    adwordsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

    const adsByGoogleScript = this._renderer2.createElement('script');
    adsByGoogleScript.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';

    this._renderer2.appendChild(this._document.body, adwordsScript);
    this._renderer2.appendChild(this._document.body, adsByGoogleScript);
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
