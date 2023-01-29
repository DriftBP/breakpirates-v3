import { Injectable } from '@angular/core';

@Injectable()
export class MockScreenService {
  canPreventSleep(): boolean {
    return true;
  }

  async endPreventSleep() {
    return jest.fn();
  }
}
