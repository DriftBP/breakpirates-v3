import { waitForAsync } from '@angular/core/testing';
import { from } from 'rxjs';
import { Shallow } from 'shallow-render';

import { SoundboardComponent } from './soundboard.component';
import { SoundboardModule } from './soundboard.module';
import { SoundboardService } from './soundboard.service';

const mockSoundboardService = {
  initialise: jest.fn(),
  isLoaded$: from([false]),
};

describe('SoundboardComponent', () => {
  let shallow: Shallow<SoundboardComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SoundboardComponent, SoundboardModule)
      .mock(SoundboardService, mockSoundboardService);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
