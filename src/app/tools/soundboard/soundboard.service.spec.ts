import { Shallow } from 'shallow-render/dist/lib/shallow';

import { SoundboardService } from './soundboard.service';
import { SoundboardModule } from './soundboard.module';

describe('SoundboardService', () => {
  let shallow: Shallow<SoundboardService>;

  beforeEach(() => {
    shallow = new Shallow(SoundboardService, SoundboardModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
