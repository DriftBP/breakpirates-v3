import { Component, OnInit } from '@angular/core';

import { ServerInfo } from '../services/server-info';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-server-stats',
  templateUrl: './server-stats.component.html',
  styleUrls: ['./server-stats.component.scss']
})
export class ServerStatsComponent implements OnInit {

  serverInfo: ServerInfo;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.scheduleService.serverInfo().subscribe(serverInfo => this.serverInfo = serverInfo);
  }

}
