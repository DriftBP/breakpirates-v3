import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Day } from '../models/day';

@Component({
    selector: 'bp-day-select',
    templateUrl: './day-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DaySelectComponent {
  days = input.required<Day[]>();
  activeDayId = input.required<number>();
}
