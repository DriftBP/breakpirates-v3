import { Shallow } from 'shallow-render';

import { DialogService } from './dialog.service';
import { SharedModule } from '../../shared.module';

describe('DialogService', () => {
  let shallow: Shallow<DialogService>;

  beforeEach(() => {
    shallow = new Shallow(DialogService, SharedModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
