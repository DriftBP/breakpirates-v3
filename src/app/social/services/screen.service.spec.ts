import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ScreenService } from './screen.service';
import { SocialModule } from '../social.module';

describe('ScreenService', () => {
  let shallow: Shallow<ScreenService>;

  beforeEach(() => {
    shallow = new Shallow(ScreenService, SocialModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});

