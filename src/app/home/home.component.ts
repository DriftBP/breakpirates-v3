import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';

import { Show } from '../schedule/show';
import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private showsSubscription: Subscription;
  private activeDayId = DateTime.local().weekday;
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  todaysSchedule: Show[];
  scheduleLoaded = false;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.showsSubscription = this.scheduleService.shows(this.activeDayId).subscribe(shows => {
        this.todaysSchedule = shows;
        this.scheduleLoaded = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.showsSubscription) {
      this.showsSubscription.unsubscribe();
    }
  }
}
