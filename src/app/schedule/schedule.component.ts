import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { Day } from './day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private childParamsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = moment().isoWeekday();
  daySelected = false;
  title: string;
  days: Day[];
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.days = this.scheduleService.days();

    this.childParamsSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(e => this.route.firstChild!.paramMap)).subscribe(params => {
        this.onParamChange(params);
    });
  }

  onParamChange(params: ParamMap) {
    const dayId = params.get('id');

    if (dayId) {
      this.activeDayId = parseInt(dayId);

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

      this.activeDayId = moment().isoWeekday();

      // Default title
      this.title = 'SCHEDULE.TODAYS_SCHEDULE';
    }
  }

  ngOnDestroy() {
    if (this.childParamsSubscription) {
      this.childParamsSubscription.unsubscribe();
    }
  }

  private setTitle(): void {
    const activeDay = this.days.find(day => day.id === this.activeDayId);

    if (activeDay) {
      this.title = activeDay.name;
    }
  }

}
