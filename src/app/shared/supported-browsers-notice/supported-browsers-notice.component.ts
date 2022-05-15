import { Component } from '@angular/core';

import { SupportedBrowsersService } from '../services/supported-browsers/supported-browsers.service';

@Component({
  selector: 'bp-supported-browsers-notice',
  templateUrl: './supported-browsers-notice.component.html'
})
export class SupportedBrowsersNoticeComponent {
  readonly alertType = 'danger';

  isBrowserSupported: boolean;

  constructor(private readonly supportedBrowsersService: SupportedBrowsersService) {
    this.isBrowserSupported = this.supportedBrowsersService.isBrowserSupported;
  }

}
