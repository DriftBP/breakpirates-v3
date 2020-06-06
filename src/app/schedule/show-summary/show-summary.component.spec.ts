import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';
import moment from 'moment';

import { ShowSummaryComponent } from './show-summary.component';
import { ScheduleModule } from '../schedule.module';
import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';

const mockShow1: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00:00',
  end_time: '00:00:00',
  day_id: 1,
  genres: [],
  hosts: []
};
const mockShow2: Show = { ...mockShow1, id: 2 };

describe('ShowSummaryComponent', () => {
  let shallow: Shallow<ShowSummaryComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ShowSummaryComponent, ScheduleModule)
      .mock(ScheduleService, {
        nowPlaying: of(mockShow2),
        showHosts: () => of([]),
        showGenres: () => of([]),
        dayName: () => '',
        getDates: () => ({ startDate: moment(), endDate: moment() }),
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should not display day of week by default', async () => {
    const { find } = await shallow.render({bind: {show: mockShow1}});

    const day = find('.show-summary__day');

    expect(day.length).toEqual(0);
  });

  it('should display day of week', async () => {
    const { find } = await shallow.render({bind: {show: mockShow1, displayDay: true}});

    const day = find('.show-summary__day');

    expect(day.length).toEqual(1);
  });

  it('should not indicate show is now playing', async () => {
    const { find } = await shallow.render({bind: {show: mockShow1}});

    const nowPlaying = find('.show-summary__now-playing');

    expect(nowPlaying.length).toEqual(0);
  });

  it('should indicate show is now playing', async () => {
    const { find } = await shallow.render({bind: {show: mockShow2}});

    const nowPlaying = find('.show-summary__now-playing');

    expect(nowPlaying.length).toEqual(1);
  });
});
