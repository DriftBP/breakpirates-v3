import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { DaySelectComponent } from './day-select.component';
import { ScheduleModule } from '../schedule.module';
import { Day } from '../day';

const mockDay: Day = {
  id: 1,
  name: 'Monday'
};

describe('DaySelectComponent', () => {
  let shallow: Shallow<DaySelectComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(DaySelectComponent, ScheduleModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should list days of the week', async () => {
    const { find } = await shallow.render({bind: {days: [ mockDay ]}});
    const days = find('.nav-link');

    expect(days.length).toBeGreaterThan(0);
  });
});
