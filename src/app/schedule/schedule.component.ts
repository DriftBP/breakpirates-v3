import { Component, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DateTime, WeekdayNumbers } from 'luxon';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

import { Day } from './models/day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnDestroy {
  @Input() days: Day[] = [];

  private childParamsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.childParamsSubscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap((route) => route.paramMap),
      tap(
        paramMap => console.log('ParamMap', paramMap)
      )
    ).subscribe(
      (paramAsMap: any) => this.onParamChange(paramAsMap)
    )
  }

  onParamChange(params: ParamMap) {
    const dayId = params.get('id');

    if (dayId) {
      this.activeDayId = parseInt(dayId) as WeekdayNumbers;

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
    const activeDay = this.days?.find(day => day.id === activeDayId);

    if (activeDay) {
      return activeDay.name;
    }

    return '';
  }

}
