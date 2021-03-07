import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ChatComponent } from './chat.component';
import { SocialModule } from '../social.module';
import { FullscreenService } from '../services/fullscreen.service';

describe('ChatComponent', () => {
  let shallow: Shallow<ChatComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ChatComponent, SocialModule)
      .mock(FullscreenService, {
        canRequestFullscreen: () => true
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
