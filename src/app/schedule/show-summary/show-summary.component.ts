import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTime } from 'luxon';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { AppSettings } from '../../app-settings';
import { ShowService } from '../services/show.service';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { HostListComponent } from '../host-list/host-list.component';
import { GenreListComponent } from '../genre-list/genre-list.component';
import { NowLiveComponent } from '../now-live/now-live.component';
import { TimePipe } from '../../shared/pipes/time.pipe';

@Component({
    selector: 'bp-show-summary',
    templateUrl: './show-summary.component.html',
    styleUrls: ['./show-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      RouterModule,
      NowLiveComponent,
      HostListComponent,
      GenreListComponent,
      SafePipe,
      TimePipe,
      TranslatePipe
    ]
})
export class ShowSummaryComponent {
  show = input.required<Show>();
  displayDay = input<boolean>(false);

  dayName: Signal<string>;
  dates: Signal<{
    startDate: DateTime;
    endDate: DateTime;
  }>;
  showImage: Signal<string | undefined>;
  showImageCssValue: Signal<string | undefined>;

  constructor(
    private readonly dayService: DayService,
    private readonly showService: ShowService
  ) {
    this.dates = computed(() => {
      return this.showService.getDates(this.show());
    });

    this.dayName = computed(() => {
      return this.dayService.dayName(this.show().day_id);
    });

    this.showImage = computed(() => {
      return this.show().image ? `${AppSettings.ASSET_SHOW_IMAGE}${this.show().image}` : undefined;
    });

    this.showImageCssValue = computed(() => {
      return this.showImage() ? `url(${this.showImage()})` : undefined;
    });
  }
}
