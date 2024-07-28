import { ChangeDetectionStrategy, Component, Signal, computed, effect, input } from '@angular/core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { ScheduleService } from '../services/schedule.service';
import { AppSettings } from '../../app-settings';
import { ShowService } from '../services/show.service';
import { ScrollService } from '../../shared/services/scroll/scroll.service';

@Component({
  selector: 'bp-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSummaryComponent {
  show = input.required<Show>();
  displayDay = input<boolean>(false);

  dayName: Signal<string>;
  nextDate: string;
  endDate: string;
  showImage: Signal<string>;
  isOnAir: Signal<boolean>;

  faVolumeUp = faVolumeUp;

  constructor(
    private readonly dayService: DayService,
    private readonly scheduleService: ScheduleService,
    private readonly showService: ShowService,
    private readonly scrollService: ScrollService
  ) {
    effect(() => {
      if (this.show() !== undefined) {
        const { startDate, endDate } = this.showService.getDates(this.show());

        this.nextDate = startDate.toISO();
        this.endDate = endDate.toISO();
      }
    });

    this.dayName = computed(() => {
      return this.displayDay() ? this.dayService.dayName(this.show().day_id) : undefined;
    });

    this.showImage = computed(() => {
      return this.show().image ? `url(${AppSettings.ASSET_SHOW_IMAGE}${this.show().image})` : undefined;
    });

    this.isOnAir = computed(() => {
      return this.scheduleService.nowPlaying()?.id === this.show().id;
    });
  }

  scrollToPlayer(): void {
    this.scrollService.scrollToTop();
  }
}
