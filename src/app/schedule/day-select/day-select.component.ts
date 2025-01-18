import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Day } from '../models/day';
import { ActiveDirective } from '../../shared/directives/active.directive';

@Component({
  selector: 'bp-day-select',
  templateUrl: './day-select.component.html',
  imports: [
    RouterModule,
    ActiveDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySelectComponent {
  days = input.required<Day[]>();
  activeDayId = input.required<number>();
}
