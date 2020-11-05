import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Subscription } from 'rxjs';

import { Show } from './show';
import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Day } from './day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = moment().isoWeekday();
  daySelected = false;
  title: string;
  days: Day[];
  todaysSchedule: Show[];
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.days = this.scheduleService.days();

    if (!this.route.snapshot.paramMap.get('id')) {
      // Default title
      this.title = 'SCHEDULE.TODAYS_SCHEDULE';
    }

    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.activeDayId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        this.daySelected = true;

        this.setTitle();

        this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
          scheduleConfigInactive,
          {
            name: this.title,
            isActive: true
          }
        ]);
      } else {
        this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
          scheduleConfigActive
        ]);
      }

      this.todaysSchedule = this.route.snapshot.data['show'];
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private setTitle(): void {
    const activeDay = this.days.find(day => day.id === this.activeDayId);

    if (activeDay) {
      this.title = activeDay.name;
    }
  }

}
