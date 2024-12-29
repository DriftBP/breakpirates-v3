import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTime } from 'luxon';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { AppSettings } from '../../app-settings';
import { ShowService } from '../services/show.service';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { NowLiveComponent } from '../now-live/now-live.component';
import { RouterModule } from '@angular/router';
import { GenreListComponent } from '../genre-list/genre-list.component';
import { HostListComponent } from '../host-list/host-list.component';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'bp-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss'],
  imports: [
    RouterModule,
    NowLiveComponent,
    GenreListComponent,
    HostListComponent,
    TimePipe,
    TranslatePipe,
    SafePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
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
