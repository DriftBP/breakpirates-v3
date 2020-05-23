import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { find } from 'lodash';
import { Subscription } from 'rxjs';

import { Show } from './show';
import { ScheduleService } from '../shared/services/schedule.service';
import { Day } from './day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { homeConfigInactive, scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private showsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    homeConfigInactive
  ];

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

      this.showsSubscription = this.scheduleService.shows(this.activeDayId).subscribe(shows => {
          this.todaysSchedule = shows;
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

    if (this.showsSubscription) {
      this.showsSubscription.unsubscribe();
    }
  }

  private setTitle(): void {
    const activeDay = find(this.days, day => day.id === this.activeDayId);

    if (activeDay) {
      this.title = activeDay.name;
    }
  }

}
