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
  serverInfo: ServerInfo;

  isLiveShow(): boolean {
    return this.nowPlaying !== undefined && this.nowPlaying.id !== undefined;
  }

  getNowPlaying(): void {
    this.scheduleService.nowPlaying.subscribe(nowPlaying => this.nowPlaying = nowPlaying);
  }

  ngOnInit() {
    this.getNowPlaying();

    this.scheduleService.serverInfo.subscribe(serverInfo => this.serverInfo = serverInfo);
  }

}
