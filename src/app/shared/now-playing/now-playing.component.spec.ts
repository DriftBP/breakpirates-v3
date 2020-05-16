import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { NowPlayingComponent } from './now-playing.component';
import { SharedModule } from '../shared.module';
import { Show } from '../../schedule/show';
import { ScheduleService } from '../services/schedule.service';
import { ServerInfo } from '../services/server-info';

const mockShow: Show = {
  id: 1,
  title: 'title',
  start_time: '01:00:00',
  end_time: '02:00:00',
  day_id: 1
};

const mockServerInfo: ServerInfo = {
  CurrentListeners: 20,
  StreamStatus: 1,
  PeakListeners: 80,
  MaxListeners: 80,
  UniqueListeners: 20,
  Bitrate: 128,
  SongTitle: 'Sont title'
};

describe('NowPlayingComponent', () => {
  let shallow: Shallow<NowPlayingComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(NowPlayingComponent, SharedModule)
      .mock(ScheduleService, {
        nowPlaying: () => of( mockShow ),
        serverInfo: of( mockServerInfo )
    });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
