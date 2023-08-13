import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../models/show';

@Component({
  selector: 'bp-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;

  todaysSchedule: Show[];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ schedule }) => {
      this.todaysSchedule = schedule;
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
