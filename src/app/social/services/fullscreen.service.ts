import { Injectable } from '@angular/core';

@Injectable()
export class FullscreenService {
  private _canRequestFullscreen: boolean;

  constructor() {
    const docElement = document.documentElement;
    this._canRequestFullscreen = !!docElement.requestFullscreen;
  }

  canRequestFullscreen(): boolean {
    return this._canRequestFullscreen;
  }

  requestFullscreen(element: Element): void {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
}
