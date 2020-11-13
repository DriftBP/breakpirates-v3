import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ServerInfo } from '../services/schedule/server-info';
import { ScheduleService } from '../services/schedule/schedule.service';

@Component({
  selector: 'bp-server-stats',
  templateUrl: './server-stats.component.html',
  styleUrls: ['./server-stats.component.scss']
})
export class ServerStatsComponent implements OnInit, OnDestroy {

  private serverInfoSubscription: Subscription;

  serverInfo: ServerInfo;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.serverInfoSubscription = this.scheduleService.serverInfo.subscribe(serverInfo => this.serverInfo = serverInfo);
  }

  ngOnDestroy() {
    if (this.serverInfoSubscription) {
      this.serverInfoSubscription.unsubscribe();
    }
  }

}
