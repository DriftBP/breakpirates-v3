import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { SupportedBrowsersService } from '../services/supported-browsers/supported-browsers.service';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
  selector: 'bp-supported-browsers-notice',
  templateUrl: './supported-browsers-notice.component.html',
  imports: [
    TranslateModule,
    AlertModule
  ],
  standalone: true
})
export class SupportedBrowsersNoticeComponent {
  readonly alertType = 'danger';

  isBrowserSupported: boolean;

  constructor(
    private readonly supportedBrowsersService: SupportedBrowsersService,
    private readonly googleAnalyticsService: GoogleAnalyticsService
  ) {
    const isBrowserSupported = this.supportedBrowsersService.isBrowserSupported;

    this.isBrowserSupported = isBrowserSupported;

    if (!isBrowserSupported) {
      this.googleAnalyticsService.trackEvent('display', 'isBrowserSupported', 'false');
    }
  }

}
