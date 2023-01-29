import { from } from "rxjs";

export const MockSoundboardService = {
  initialise: jest.fn(),
  isLoaded$: from([false]),
};
