import { Shallow } from 'shallow-render';

import { AudioService } from './audio.service';
import { SharedModule } from '../../shared.module';

describe('AudioService', () => {
  let shallow: Shallow<AudioService>;

  beforeEach(() => {
    shallow = new Shallow(AudioService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
