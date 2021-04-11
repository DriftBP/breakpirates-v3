import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { NowPlayingComponent } from './now-playing.component';
import { SharedModule } from '../shared.module';
import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../services/schedule/schedule.service';

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '01:00:00',
  end_time: '02:00:00',
  day_id: 1,
  genres: [],
  hosts: []
};

describe('NowPlayingComponent', () => {
  let shallow: Shallow<NowPlayingComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NowPlayingComponent, SharedModule)
      .mock(ScheduleService, {
        getShowProgress: jest.fn(show => 50),
        nowPlaying: of( mockShow )
    });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });

  it('should always have an image filename', async () => {
    const { instance } = await shallow.render();

    expect(instance.nowPlayingImage).toBeTruthy();
  });
});
