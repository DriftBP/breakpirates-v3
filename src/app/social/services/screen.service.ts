import { Injectable } from '@angular/core';

interface NavigatorWakeLock extends Navigator {
  wakeLock: {
    request: (type: any) => any;
    release: () => void;
  }
}

@Injectable()
export class ScreenService {
  private _canPreventSleep: boolean;
  private wakeLock = null;

  constructor() {
    // Screen Wake Lock API is only available when served over HTTPS
    this._canPreventSleep = 'wakeLock' in navigator;
  }

  get canPreventSleep(): boolean {
    return this._canPreventSleep;
  }

  async startPreventSleep() {
    if (this._canPreventSleep) {
      try {
        this.wakeLock = await (navigator as NavigatorWakeLock).wakeLock.request('screen');
      } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  async endPreventSleep() {
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
    }
  }
}
