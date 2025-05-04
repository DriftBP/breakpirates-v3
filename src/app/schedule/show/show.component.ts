import { Component, computed, effect, input, Signal } from '@angular/core';
import { DateTime } from 'luxon';

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
    styleUrls: ['./show.component.scss'],
    standalone: false
})
export class ShowComponent {
  show = input<Show>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  dayName: Signal<string>;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  dates: Signal<{
    startDate: DateTime;
    endDate: DateTime;
  }>;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.dates = computed(() => {
      return this.show() !== undefined ? this.showService.getDates(this.show()) : undefined;
    });

    effect(() => {
      const show = this.show();

      if (show) {
        this.setBreadcrumb(show);
      }
    }, { allowSignalWrites: true });

    this.dayName = computed(() => {
      return this.show() ? this.dayService.dayName(this.show().day_id) : undefined;
    });
  }

  setBreadcrumb(show: Show): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: show.title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
