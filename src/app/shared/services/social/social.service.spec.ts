import { Shallow } from 'shallow-render';

import { SocialService } from './social.service';
import { SharedModule } from '../../shared.module';

describe('SocialService', () => {
  let shallow: Shallow<SocialService>;

  beforeEach(() => {
    shallow = new Shallow(SocialService, SharedModule);
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
