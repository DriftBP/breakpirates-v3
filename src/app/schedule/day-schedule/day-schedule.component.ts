import { Component, input } from '@angular/core';

import { Show } from '../models/show';

@Component({
  selector: 'bp-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent {
  schedule = input<Show[]>();
}
