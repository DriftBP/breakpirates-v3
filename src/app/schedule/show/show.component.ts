import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { DayService } from '../services/day.service';
import { ScheduleService } from '../../shared/services/schedule/schedule.service';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  show: Show;
  dayName: string;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string;
  endDate: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dayService: DayService,
    private readonly scheduleService: ScheduleService,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.initialiseState();
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  initialiseState(): void {
    this.show = this.route.snapshot.data['show'];

    this.dayName = this.dayService.dayName(this.show.day_id);

    const { startDate, endDate } = this.scheduleService.getDates(this.show);

    this.nextDate = startDate.toISO();
    this.endDate = endDate.toISO();

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show.title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
