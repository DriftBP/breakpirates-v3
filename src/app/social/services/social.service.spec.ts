import { Shallow } from 'shallow-render/dist/lib/shallow';

import { SocialService } from './social.service';
import { SocialModule } from '../social.module';

describe('SocialService', () => {
  let shallow: Shallow<SocialService>;

  beforeEach(() => {
    shallow = new Shallow(SocialService, SocialModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });

  it('should return three social sites', () => {
    const {instance} = shallow.createService();
    expect(instance.getSocialSites().length).toBe(3);
  });
});
