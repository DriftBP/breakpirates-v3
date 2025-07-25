import { Component, inject } from '@angular/core';

import { SupportedBrowsersService } from '../services/supported-browsers/supported-browsers.service';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
    selector: 'bp-supported-browsers-notice',
    templateUrl: './supported-browsers-notice.component.html',
    imports: [
      AlertModule,
      TranslatePipe
    ],
    providers: [
      SupportedBrowsersService
    ]
})
export class SupportedBrowsersNoticeComponent {
  private readonly supportedBrowsersService = inject(SupportedBrowsersService);
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);

  readonly alertType = 'danger';

  isBrowserSupported: boolean;

  constructor() {
    const isBrowserSupported = this.supportedBrowsersService.isBrowserSupported;

    this.isBrowserSupported = isBrowserSupported;

    if (!isBrowserSupported) {
      this.googleAnalyticsService.trackEvent('display', 'isBrowserSupported', 'false');
    }
  }

}
