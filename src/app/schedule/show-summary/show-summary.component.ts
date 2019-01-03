import { Component, OnInit, Input } from '@angular/core';

import { Show } from '../show';
import { Host } from '../../profile/host';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss']
})
export class ShowSummaryComponent implements OnInit {
  @Input() show: Show;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  hosts: Host[];

  ngOnInit() {
    if (this.show !== undefined) {
      this.scheduleService.showHosts(this.show.id)
        .subscribe(hosts => this.hosts = hosts);
    }
  }
}
