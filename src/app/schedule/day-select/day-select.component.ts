import { Component, Input } from '@angular/core';

import { Day } from '../day';

@Component({
  selector: 'bp-day-select',
  templateUrl: './day-select.component.html'
})
export class DaySelectComponent {
  @Input() days: Day[];
  @Input() activeDayId: number;
}
