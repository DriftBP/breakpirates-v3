import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { ShowSummaryComponent } from './show-summary.component';
import { ScheduleModule } from '../schedule.module';
import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00:00',
  end_time: '00:00:00',
  day_id: 1,
  description: ''
};

describe('ShowSummaryComponent', () => {
  let shallow: Shallow<ShowSummaryComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ShowSummaryComponent, ScheduleModule)
      .mock(ScheduleService, {
        showHosts: () => of([]),
        showGenres: () => of([]),
        dayName: () => ''
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should not display day of week by default', async () => {
    const { find } = await shallow.render({bind: {show: mockShow}});

    const day = find('.show-summary__day');

    expect(day.length).toEqual(0);
  });

  it('should display day of week', async () => {
    const { find } = await shallow.render({bind: {show: mockShow, displayDay: true}});

    const day = find('.show-summary__day');

    expect(day.length).toEqual(1);
  });
});
