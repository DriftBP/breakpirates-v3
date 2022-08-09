import { Shallow } from 'shallow-render/dist/lib/shallow';

import { FullscreenService } from './fullscreen.service';
import { SocialModule } from '../social.module';

describe('FullscreenService', () => {
  let shallow: Shallow<FullscreenService>;

  beforeEach(() => {
    shallow = new Shallow(FullscreenService, SocialModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
