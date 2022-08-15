import { waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { Shallow } from 'shallow-render';

import { RateMyTakeawaySoundboardComponent } from './rate-my-takeaway-soundboard.component';
import { SoundboardModule } from './soundboard.module';
import { SoundboardService } from './soundboard.service';

const mockSoundboardService = {
  initialise: jest.fn(),
  isLoaded$: from([false]),
};

describe('RateMyTakeawaySoundboardComponent', () => {
  let shallow: Shallow<RateMyTakeawaySoundboardComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(RateMyTakeawaySoundboardComponent, SoundboardModule)
      .mock(SoundboardService, mockSoundboardService);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
