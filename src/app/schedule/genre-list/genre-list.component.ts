import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Genre } from '../../music/models/genre';
import { SortOrder } from '../../shared/pipes/sort-order';
import { SortByPipe } from '../../shared/pipes/sort-by.pipe';

@Component({
  selector: 'bp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  imports: [
    RouterModule,
    SortByPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreListComponent {
  genres = input.required<Genre[]>();

  order = SortOrder.Ascending;
}
