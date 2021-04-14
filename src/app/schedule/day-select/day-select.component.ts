import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Day } from '../models/day';

@Component({
  selector: 'bp-day-select',
  templateUrl: './day-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySelectComponent {
  @Input() days: Day[];
  @Input() activeDayId: number;
}
