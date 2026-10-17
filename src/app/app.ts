import { Component, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterOutlet
} from '@angular/router';

import { GoogleAnalyticsService } from './shared/services/google-analytics/google-analytics.service';
import { ThemeService } from './shared/services/theme/theme.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'bp-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    LoadingSpinnerComponent
  ]
})
export class App {
  private router = inject(Router);
  private googleAnalyticsService = inject(GoogleAnalyticsService);
  private themeService = inject(ThemeService);

  @HostBinding('attr.data-theme') get theme() { return this.themeService.currentTheme(); }

  loading = false;

  constructor () {
    this.router.events.pipe(
      takeUntilDestroyed()
    ).subscribe(event => this.processEvent(event));
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

}
