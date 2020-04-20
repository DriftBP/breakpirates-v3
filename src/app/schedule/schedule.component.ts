import { Component, OnInit } from '@angular/core';

import { Show } from './show';
import { ScheduleService } from './schedule.service';
import { Day } from './day';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  days: Day[];
  schedule: { [day: string]: Show[]; } = {};

  constructor(
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.scheduleService.days().subscribe(days => {
      this.days = days;

      days.forEach(day => {
        this.scheduleService.shows(day.id).subscribe(
          shows => {
            this.schedule[day.name] = shows;
          },
          () => {}
        );
      });
    });
  }

}
