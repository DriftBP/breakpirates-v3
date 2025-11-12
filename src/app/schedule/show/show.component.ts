import { Component, computed, effect, input, Signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';
import { TranslatePipe } from '@ngx-translate/core';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ShowService } from '../services/show.service';
import { NowLiveComponent } from '../now-live/now-live.component';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { GenreListComponent } from '../genre-list/genre-list.component';
import { HostListComponent } from '../host-list/host-list.component';
import { ImageClickDirective } from '../../shared/directives/image-click.directive';

@Component({
    selector: 'bp-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    imports: [
      RouterLink,
      NowLiveComponent,
      GenreListComponent,
      HostListComponent,
      TimePipe,
      TranslatePipe,
      ImageClickDirective
    ]
})
export class ShowComponent {
  private readonly dayService = inject(DayService);
  private readonly showService = inject(ShowService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  show = input.required<Show>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  dayName: Signal<string | undefined>;
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  dates: Signal<{
    startDate: DateTime;
    endDate: DateTime;
  }>;

  constructor() {
    this.dates = computed(() => {
      return this.showService.getDates(this.show());
    });

    effect(() => {
      const show = this.show();

      if (show) {
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
