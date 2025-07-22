import { ChangeDetectionStrategy, Component, computed, input, Signal, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

import { ScheduleService } from '../services/schedule.service';
import { ScrollService } from '../../shared/services/scroll/scroll.service';
import { Show } from '../models/show';

@Component({
    selector: 'bp-now-live',
    templateUrl: './now-live.component.html',
    styleUrls: ['./now-live.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FontAwesomeModule,
      TranslatePipe
    ],
    providers: [
      ScrollService
    ]
})
export class NowLiveComponent {
  private readonly scheduleService = inject(ScheduleService);
  private readonly scrollService = inject(ScrollService);

  show = input.required<Show>();

  isOnAir: Signal<boolean>;

  faVolumeUp = faVolumeUp;

  constructor() {
    this.isOnAir = computed(() => {
      return this.scheduleService.nowPlaying()?.id === this.show().id;
    });
  }

  scrollToPlayer(): void {
    this.scrollService.scrollToTop();
  }
}
