import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Genre } from '../../music/models/genre';
import { SortOrder } from '../../shared/pipes/sort-order';
import { SortByPipe } from '../../shared/pipes/sort-by.pipe';

@Component({
    selector: 'bp-genre-list',
    templateUrl: './genre-list.component.html',
    styleUrls: ['./genre-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      RouterLink,
      SortByPipe
    ]
})
export class GenreListComponent {
  genres = input.required<Genre[]>();

  order = SortOrder.Ascending;
}
