import { Injectable } from '@angular/core';

@Injectable()
export class MockFullscreenService {
  canRequestFullscreen(): boolean {
    return true;
  }
}
