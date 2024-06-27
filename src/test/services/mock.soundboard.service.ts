import { signal } from "@angular/core";

export const MockSoundboardService = {
  initialise: jest.fn(),
  isLoaded: signal(false),
};
