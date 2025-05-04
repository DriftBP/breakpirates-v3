import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { DateTime } from 'luxon';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { AppSettings } from '../../app-settings';
import { ShowService } from '../services/show.service';

@Component({
    selector: 'bp-show-summary',
    templateUrl: './show-summary.component.html',
    styleUrls: ['./show-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ShowSummaryComponent {
  show = input.required<Show>();
  displayDay = input<boolean>(false);

  dayName: Signal<string>;
  dates: Signal<{
    startDate: DateTime;
    endDate: DateTime;
  }>;
  showImage: Signal<string>;
  showImageCssValue: Signal<string>;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService
  ) {
    this.dates = computed(() => {
      return this.show() !== undefined ? this.showService.getDates(this.show()) : undefined;
    });

    this.dayName = computed(() => {
      return this.displayDay() ? this.dayService.dayName(this.show().day_id) : undefined;
    });

    this.showImage = computed(() => {
      return this.show().image ? `${AppSettings.ASSET_SHOW_IMAGE}${this.show().image}` : undefined;
    });

    this.showImageCssValue = computed(() => {
      return this.showImage() ? `url(${this.showImage()})` : undefined;
    });
  }
}
