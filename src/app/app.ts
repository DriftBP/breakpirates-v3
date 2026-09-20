import { Component, OnDestroy, HostBinding, computed, Signal, inject } from '@angular/core';
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
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'bp-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    LoadingSpinnerComponent
  ]
})
export class App implements OnDestroy {
  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);
  private themeService = inject(ThemeService);

  @HostBinding('attr.data-theme') get theme() { return this.currentTheme(); }

  private eventsSubscription: Subscription;
  private currentTheme: Signal<Theme>;

  loading = false;

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

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
