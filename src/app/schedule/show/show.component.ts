import { Component, computed, effect, input, Signal } from '@angular/core';

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
export class ShowComponent {
  show = input<Show>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  dayName: Signal<string>;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string;
  endDate: string;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    effect(() => {
      if (this.show()) {
        const { startDate, endDate } = this.showService.getDates(this.show());

        this.nextDate = startDate.toISO();
        this.endDate = endDate.toISO();

        this.setBreadcrumb();
      }
    });

    this.dayName = computed(() => {
      return this.show() ? this.dayService.dayName(this.show().day_id) : undefined;
    });
  }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show().title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
