import { Component } from '@angular/core';

import { SupportedBrowsersService } from '../services/supported-browsers.service';

@Component({
  selector: 'app-supported-browsers-notice',
  templateUrl: './supported-browsers-notice.component.html'
})
export class SupportedBrowsersNoticeComponent{
  isBrowserSupported: boolean;
  alertType = 'danger';

  constructor(private readonly supportedBrowsersService: SupportedBrowsersService) {
    this.isBrowserSupported = this.supportedBrowsersService.isBrowserSupported;
  }

}
