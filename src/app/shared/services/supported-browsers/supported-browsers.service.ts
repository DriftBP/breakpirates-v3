import { Injectable } from '@angular/core';

import supportedBrowsers from '../../../../../supportedBrowsers';

@Injectable()
export class SupportedBrowsersService {
  private _isBrowserSupported: boolean;

  constructor() {
    this._isBrowserSupported = supportedBrowsers.test(navigator.userAgent);
  }

  get isBrowserSupported(): boolean {
    return this._isBrowserSupported;
  }
}
