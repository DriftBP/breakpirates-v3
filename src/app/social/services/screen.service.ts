import { Injectable } from '@angular/core';

interface NavigatorWakeLock extends Navigator {
  wakeLock: {
    request: () => any; // Or whatever is the type of the exitApp function
  }
}

@Injectable()
export class ScreenService {
  private canPreventSleep: boolean;
  private wakeLock = null;

  constructor() {
    this.canPreventSleep = 'wakeLock' in navigator;
  }

  async startPreventSleep() {
    if (this.canPreventSleep) {
      try {
        this.wakeLock = await (navigator as NavigatorWakeLock).wakeLock.request();
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  endPreventSleep() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }
}
