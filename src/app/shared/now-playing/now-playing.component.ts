import { Component, OnInit } from '@angular/core';

import { Show } from '../../schedule/show';
import { ScheduleService } from '../services/schedule.service';
import { ServerInfo } from '../services/server-info';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService
  ) { }

  nowPlaying: Show;
  isLiveShow = false;
  serverInfo: ServerInfo;

  ngOnInit() {
    this.scheduleService.nowPlaying.subscribe(nowPlaying => {
      this.nowPlaying = nowPlaying;

      this.isLiveShow = nowPlaying?.id !== undefined;
    });
    this.scheduleService.serverInfo.subscribe(serverInfo => this.serverInfo = serverInfo);
  }

}
