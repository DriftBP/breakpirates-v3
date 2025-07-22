import { Component, OnDestroy, OnInit, input, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterModule } from '@angular/router';
import { DateTime, WeekdayNumbers } from 'luxon';
import { of, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';

import { Day } from './models/day';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive, scheduleConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { DayService } from './services/day.service';
import { DaySelectComponent } from './day-select/day-select.component';

@Component({
    selector: 'bp-schedule',
    templateUrl: './schedule.component.html',
    imports: [
      RouterModule,
      DaySelectComponent,
      TranslatePipe
    ]
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly dayService = inject(DayService);

  days = input.required<Day[]>();

  private childParamsSubscription?: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;

  ngOnInit() {
    this.childParamsSubscription = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(undefined),
      switchMap(() => this.activatedRoute.firstChild?.paramMap ?? of(null))
    ).subscribe(params => {
      if (params) {
        this.onParamChange(params);
      }
    });
  }

  onParamChange(params: ParamMap) {
    const dayName = params.get('day');
    var day: Day | undefined = undefined;

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
