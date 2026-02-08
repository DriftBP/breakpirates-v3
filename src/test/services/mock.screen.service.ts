import { Injectable } from '@angular/core';

import { vi } from "vitest";

@Injectable()
export class MockScreenService {
  canPreventSleep(): boolean {
    return true;
  }

  async endPreventSleep() {
    return vi.fn();
  }
}
