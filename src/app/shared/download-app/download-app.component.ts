import { Component, ElementRef, viewChild, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { AppSettings } from '../../app-settings';
import { GoogleAnalyticsService } from '../services/google-analytics/google-analytics.service';

@Component({
    selector: 'bp-download-app',
    templateUrl: './download-app.component.html',
    imports: [
      TranslatePipe
    ]
})
export class DownloadAppComponent {
  private readonly googleAnalyticsService = inject(GoogleAnalyticsService);

  donateFormElement = viewChild.required<ElementRef>('downloadLink');

  downloadAppUrl: string;

  constructor() {
    this.downloadAppUrl = AppSettings.APP_DOWNLOAD_URL;
  }

  onClick() {
    this.googleAnalyticsService.trackEvent('click', 'Download app button', 'Side bar');
  }
}
