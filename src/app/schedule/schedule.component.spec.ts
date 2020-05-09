import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { ScheduleComponent } from './schedule.component';
import { ScheduleModule } from './schedule.module';
import { ScheduleService } from './schedule.service';
import { Day } from './day';
import { Show } from './show';

const mockDay: Day = {
  id: 1,
  name: 'Monday'
};
const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00',
  end_time: '01:00'
};

describe('ScheduleComponent', () => {
  let shallow: Shallow<ScheduleComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ScheduleComponent, ScheduleModule)
      .mock(ScheduleService, {
        days: () => of([ mockDay ]),
        shows: () => of([ mockShow ]),
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should list days of the week', async () => {
    const { find } = await shallow.render();
    const days = find('.days .day');

    expect(days.length).toEqual(7);
  });
});
