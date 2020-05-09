import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ScheduleComponent } from './schedule.component';
import { ScheduleModule } from './schedule.module';

describe('ScheduleComponent', () => {
  let shallow: Shallow<ScheduleComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ScheduleComponent, ScheduleModule);
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
