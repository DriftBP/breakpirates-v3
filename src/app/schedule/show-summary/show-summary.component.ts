import { ChangeDetectionStrategy, Component, Signal, computed, effect, input } from '@angular/core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { Show } from '../models/show';
import { DayService } from '../services/day.service';
import { ScheduleService } from '../services/schedule.service';
import { AppSettings } from '../../app-settings';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'bp-show-summary',
  templateUrl: './show-summary.component.html',
  styleUrls: ['./show-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSummaryComponent {
  show = input.required<Show>();
  displayDay = input<boolean>(false);

  dayName: Signal<string | undefined>;
  nextDate: string | undefined | null;
  endDate: string | undefined | null;
  showImage: Signal<string | undefined>;

  faVolumeUp = faVolumeUp;

  constructor(
    private readonly dayService: DayService,
    public readonly scheduleService: ScheduleService,
    private readonly showService: ShowService
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
  }

  scrollToPlayer() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
