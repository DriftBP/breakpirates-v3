import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bp-dj-list',
  templateUrl: './dj-list.component.html',
  styleUrls: ['./dj-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DjListComponent {
  djs = input.required<string[]>();
}
