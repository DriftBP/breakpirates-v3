import { Shallow } from 'shallow-render/dist/lib/shallow';

import { ShowService } from './show.service';
import { ScheduleModule } from '../schedule.module';

describe('ShowService', () => {
  let shallow: Shallow<ShowService>;

  beforeEach(() => {
    shallow = new Shallow(ShowService, ScheduleModule);
  });

  it('should be created', () => {
    const {instance} = shallow.createService();
    expect(instance).toBeTruthy();
  });
});
