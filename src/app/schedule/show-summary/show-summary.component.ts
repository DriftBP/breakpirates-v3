import { Component, OnInit, Input } from '@angular/core';

import { Show } from '../show';
import { Host } from '../../profile/host';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'bp-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.css']
})
export class ShowSummaryComponent {
  @Input() show: Show;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  hosts: Host[];

  ngOnInit() {
    this.scheduleService.showHosts(this.show.id)
      .subscribe(hosts => this.hosts = hosts);
  }
}
