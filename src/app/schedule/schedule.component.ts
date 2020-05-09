import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { find } from 'lodash';

import { Show } from './show';
import { ScheduleService } from './schedule.service';
import { Day } from './day';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  activeDayId = moment().day();
  title: string;
  days: Day[];
  todaysSchedule: Show[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.scheduleService.days().subscribe(days => {
      this.days = days;

      if (!this.route.snapshot.paramMap.get('id')) {
        // Default title
        this.title = 'Todays schedule';
      } else {
        this.setTitle();
      }
    });

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.activeDayId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      }

      this.scheduleService.shows(this.activeDayId).subscribe(shows => {
          this.todaysSchedule = shows;
        }
      );

      this.setTitle();
    });
  }

  private setTitle(): void {
    const activeDay = find(this.days, day => day.id === this.activeDayId);

    if (activeDay) {
      this.title = activeDay.name;
    }
  }

}
