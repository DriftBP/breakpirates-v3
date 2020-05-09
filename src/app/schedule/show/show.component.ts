import { Component, OnInit, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import moment from 'moment';

import { Show } from '../show';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  show: Show;
  hosts: Host[];
  dayName: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  initialiseState(): void {
    this.show = this.route.snapshot.data['show'];

    this.dayName = moment().day(this.show.day_id).format('dddd');

    this.scheduleService.showHosts(this.show.id)
      .subscribe(hosts => this.hosts = hosts);
  }

}
