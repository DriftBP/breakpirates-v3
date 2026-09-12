import { signal } from "@angular/core";

import { vi } from "vitest";

export const MockSoundboardService = {
  initialise: vi.fn(),
  isLoaded: signal(false),
};
