import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateTime, WeekdayNumbers } from 'luxon';
import { TranslatePipe } from '@ngx-translate/core';

import { ScheduleService } from '../schedule/services/schedule.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { ShowSummaryComponent } from '../schedule/show-summary/show-summary.component';

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html',
  imports: [
    RouterModule,
    ShowSummaryComponent,
    TranslatePipe,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  readonly scheduleService = inject(ScheduleService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId: WeekdayNumbers;

  constructor() {
    this.activeDayId = DateTime.local().weekday;
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
