import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { NowPlayingComponent } from './now-playing.component';
import { SharedModule } from '../shared.module';
import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../services/schedule/schedule.service';
import { ServerInfo } from '../services/schedule/server-info';

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '01:00:00',
  end_time: '02:00:00',
  day_id: 1,
  genres: [],
  hosts: []
};

const mockServerInfo: ServerInfo = {
  CurrentListeners: 20,
  StreamStatus: 1,
  PeakListeners: 80,
  MaxListeners: 80,
  UniqueListeners: 20,
  Bitrate: 128,
  SongTitle: 'Song title'
};

describe('NowPlayingComponent', () => {
  let shallow: Shallow<NowPlayingComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(NowPlayingComponent, SharedModule)
      .mock(ScheduleService, {
        timeFormat: 'HH:mm:ss',
        nowPlaying: of( mockShow ),
        serverInfo: of( mockServerInfo )
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
