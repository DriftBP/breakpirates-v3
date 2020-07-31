import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {
  private _canRequestFullscreen: boolean;

  constructor() {
    const docElement = document.documentElement;

    if (docElement.requestFullscreen) {
      this._canRequestFullscreen = true;
    } else {
      this._canRequestFullscreen = false;
    }
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
