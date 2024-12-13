import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { ScheduleService } from '../services/schedule.service';
import { ScrollService } from '../../shared/services/scroll/scroll.service';
import { Show } from '../models/show';

@Component({
  selector: 'bp-now-live',
  templateUrl: './now-live.component.html',
  styleUrls: ['./now-live.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowLiveComponent {
  show = input.required<Show>();

  isOnAir: Signal<boolean>;

  faVolumeUp = faVolumeUp;

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly scrollService: ScrollService
  ) {
    this.isOnAir = computed(() => {
      return this.scheduleService.nowPlaying()?.id === this.show().id;
    });
  }

  scrollToPlayer(): void {
    this.scrollService.scrollToTop();
  }
}
