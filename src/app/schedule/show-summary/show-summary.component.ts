import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
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
export class ShowSummaryComponent implements OnChanges {
  @Input({ required: true }) show: Show;
  @Input() displayDay = false;

  dayName: string;
  nextDate: string;
  endDate: string;
  showImage: string;

  faVolumeUp = faVolumeUp;

  constructor(
    private readonly dayService: DayService,
    public readonly scheduleService: ScheduleService,
    private readonly showService: ShowService
  ) { }

  ngOnChanges() {
    if (this.show !== undefined) {
      if (this.displayDay) {
        this.dayName = this.dayService.dayName(this.show.day_id);
      }

      const { startDate, endDate } = this.showService.getDates(this.show);

      this.nextDate = startDate.toISO();
      this.endDate = endDate.toISO();

      if (this.show.image) {
        this.showImage = `url(${AppSettings.ASSET_SHOW_IMAGE}${this.show.image})`;
      }
    }
  }

  scrollToPlayer() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
