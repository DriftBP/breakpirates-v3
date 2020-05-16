import { async } from '@angular/core/testing';
import { Shallow } from 'shallow-render';
import { of } from 'rxjs';

import { ServerStatsComponent } from './server-stats.component';
import { SharedModule } from '../shared.module';
import { ScheduleService } from '../services/schedule.service';
import { ServerInfo } from '../services/server-info';

const mockServerInfo: ServerInfo = {
  CurrentListeners: 20,
  StreamStatus: 1,
  PeakListeners: 80,
  MaxListeners: 80,
  UniqueListeners: 20,
  Bitrate: 128,
  SongTitle: 'Song title'
};

describe('ServerStatsComponent', () => {
  let shallow: Shallow<ServerStatsComponent>;

  beforeEach(async(() => {
    shallow = new Shallow(ServerStatsComponent, SharedModule)
      .mock(ScheduleService, {
        serverInfo: () => of( mockServerInfo )
    });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
