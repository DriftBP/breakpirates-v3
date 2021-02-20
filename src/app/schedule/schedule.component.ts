import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { DayService } from './day.service';
import { Day } from './day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private childParamsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;
  days: Day[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dayService: DayService,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.days = this.dayService.days();

    this.childParamsSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(e => this.route.firstChild?.paramMap)).subscribe(params => {
        this.onParamChange(params);
    });
  }

  onParamChange(params: ParamMap) {
    const dayId = params.get('id');

    if (dayId) {
      this.activeDayId = parseInt(dayId);

      const dayName = this.getDayName(this.activeDayId);

      this.breadcrumbConfig = this.baseBreadcrumbConfig.concat([
        scheduleConfigInactive,
        {
          name: dayName,
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

  private getDayName(activeDayId: number): string {
    const activeDay = this.days.find(day => day.id === activeDayId);

    if (activeDay) {
      return activeDay.name;
    }

    return '';
  }

}
