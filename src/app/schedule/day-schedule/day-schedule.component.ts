import { Component, input } from '@angular/core';

import { Show } from '../models/show';
import { ShowSummaryComponent } from '../show-summary/show-summary.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'bp-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss'],
  imports: [
    ShowSummaryComponent,
    TranslateModule
  ],
  standalone: true
})
export class DayScheduleComponent {
  schedule = input<Show[]>();
}
