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

  dayName: Signal<string | undefined>;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string | null = null;
  endDate: string | null = null;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    effect(() => {
      const show = this.show();

      if (show) {
        const { startDate, endDate } = this.showService.getDates(show);

        this.nextDate = startDate.toISO();
        this.endDate = endDate.toISO();

        this.setBreadcrumb(show);
      }
    });

    this.dayName = computed(() => {
      const show = this.show();

      return show ? this.dayService.dayName(show.day_id) : undefined;
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
