import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render/dist/lib/shallow';

import { RadioPlayerComponent } from './radio-player.component';
import { SharedModule } from '../shared.module';

declare global { interface Window { MediaElementPlayer: any; } }

class MockMediaElementPlayer {}

window.MediaElementPlayer = MockMediaElementPlayer;

describe('RadioPlayerComponent', () => {
  let shallow: Shallow<RadioPlayerComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(RadioPlayerComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
