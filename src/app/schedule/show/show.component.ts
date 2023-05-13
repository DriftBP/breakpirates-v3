import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'bp-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  private routeDataSubscription: Subscription;

  show: Show;
  dayName: string;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string;
  endDate: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dayService: DayService,
    private readonly showService: ShowService,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ show }) => {
      this.show = show;

      this.dayName = this.dayService.dayName(this.show.day_id);

      const { startDate, endDate } = this.showService.getDates(this.show);

      this.nextDate = startDate.toISO();
      this.endDate = endDate.toISO();

      this.setBreadcrumb();
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show.title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
