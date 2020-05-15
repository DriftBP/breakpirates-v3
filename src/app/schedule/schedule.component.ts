import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { find } from 'lodash';

import { Show } from './show';
import { ScheduleService } from '../shared/services/schedule.service';
import { Day } from './day';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {
  activeDayId = moment().isoWeekday();
  daySelected = false;
  title: string;
  days: Day[];
  todaysSchedule: Show[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.days = this.scheduleService.days();

    if (!this.route.snapshot.paramMap.get('id')) {
      // Default title
      this.title = 'Todays schedule';
    }

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.activeDayId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        this.daySelected = true;

        this.setTitle();
      }

      this.scheduleService.shows(this.activeDayId).subscribe(shows => {
          this.todaysSchedule = shows;
        }
      );
    });
  }

  private setTitle(): void {
    const activeDay = find(this.days, day => day.id === this.activeDayId);

    if (activeDay) {
      this.title = activeDay.name;
    }
  }

}
