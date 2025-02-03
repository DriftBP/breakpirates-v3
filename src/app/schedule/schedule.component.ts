import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DateTime, WeekdayNumbers } from 'luxon';
import { Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { Day } from './models/day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { DayService } from './services/day.service';

@Component({
  selector: 'bp-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
  days = input.required<Day[]>();

  private childParamsSubscription?: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly dayService: DayService
  ) { }

  ngOnInit() {
    this.childParamsSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(e => this.activatedRoute.firstChild?.paramMap)).subscribe(params => {
        this.onParamChange(params);
    });
  }

  onParamChange(params: ParamMap) {
    const dayName = params.get('day');
    var day: Day;

    if (dayName) {
      day = this.dayService.dayByName(dayName);
    }

    if (day) {
      this.activeDayId = day.id as WeekdayNumbers;

      this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
        scheduleConfigInactive,
        {
          name: day.name,
          isActive: true
        }
      ]);
    } else {
      this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
        scheduleConfigActive
      ]);

      this.activeDayId = DateTime.local().weekday;
    }

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  ngOnDestroy() {
    if (this.childParamsSubscription) {
      this.childParamsSubscription.unsubscribe();
    }
  }
}
