import { Injectable } from '@angular/core';

interface WakeLockSentinel {
  release(): void;
}

@Injectable()
export class ScreenService {
  private _canPreventSleep: boolean;
  private wakeLock: WakeLockSentinel | null = null;

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
        const wakeLockApi = (navigator as { wakeLock?: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock;
        if (wakeLockApi) {
          this.wakeLock = await wakeLockApi.request('screen');
        }
      } catch (err: unknown) {
        console.error(`${(err as Error).name}, ${(err as Error).message}`);
      }
    }
  }

  async endPreventSleep() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }
}
