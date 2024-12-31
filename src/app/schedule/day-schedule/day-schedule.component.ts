import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Show } from '../models/show';
import { ShowSummaryComponent } from '../show-summary/show-summary.component';

@Component({
  selector: 'bp-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss'],
  imports: [
    ShowSummaryComponent,
    TranslatePipe
  ]
})
export class DayScheduleComponent {
  schedule = input<Show[]>();
}
