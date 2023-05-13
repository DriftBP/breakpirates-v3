import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Day } from '../models/day';

@Component({
  selector: 'bp-day-select',
  templateUrl: './day-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySelectComponent {
  @Input({ required: true }) days: Day[];
  @Input({ required: true }) activeDayId: number;
}
