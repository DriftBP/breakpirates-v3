import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateTime } from 'luxon';
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
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    public readonly scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
