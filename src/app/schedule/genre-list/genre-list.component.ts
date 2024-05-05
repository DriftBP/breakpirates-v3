import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Genre } from '../../music/models/genre';
import { SortOrder } from '../../shared/pipes/sort-order';

@Component({
  selector: 'bp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreListComponent {
  genres = input.required<Genre[]>();

  order = SortOrder.Ascending;
}
