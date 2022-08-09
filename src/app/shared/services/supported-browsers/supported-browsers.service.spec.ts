import { Shallow } from 'shallow-render/dist/lib/shallow';

import { SupportedBrowsersService } from './supported-browsers.service';
import { SharedModule } from '../../shared.module';

describe('SupportedBrowsersService', () => {
  let shallow: Shallow<SupportedBrowsersService>;

  beforeEach(() => {
    shallow = new Shallow(SupportedBrowsersService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
