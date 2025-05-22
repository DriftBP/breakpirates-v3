import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bp-roster-list',
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RosterListComponent {
  names = input.required<string[]>();
}
