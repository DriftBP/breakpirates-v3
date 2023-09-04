import { Component, Input } from '@angular/core';

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
  @Input()
  get show(): Show | undefined {
    return this._show;
  }
  set show(show: Show | undefined) {
    if (show) {
      this._show = show;

      this.dayName = this.dayService.dayName(show.day_id);

      const { startDate, endDate } = this.showService.getDates(show);

      this.nextDate = startDate.toISO();
      this.endDate = endDate.toISO();

      this.setBreadcrumb();
    }
  }

  private _show?: Show;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  dayName: string = '';
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string | null = null;
  endDate: string | null = null;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show?.title ?? '',
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
