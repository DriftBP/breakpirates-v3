import { Shallow } from 'shallow-render';

import { ThemeService } from './theme.service';
import { SharedModule } from '../shared.module';

describe('ThemeService', () => {
  let shallow: Shallow<ThemeService>;

  beforeEach(() => {
    shallow = new Shallow(ThemeService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
