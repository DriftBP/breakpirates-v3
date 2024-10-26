import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Day } from '../models/day';
import { ActiveDirective } from '../../shared/directives/active.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bp-day-select',
  templateUrl: './day-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ActiveDirective,
    RouterModule
  ],
  standalone: true
})
export class DaySelectComponent {
  days = input.required<Day[]>();
  activeDayId = input.required<number>();
}
