import { Component, Input } from '@angular/core';

import { Day } from '../day';

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss']
})
export class DaySelectComponent {
  @Input() days: Day[];
  @Input() activeDayId: number;

}
