import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Genre } from '../../music/models/genre';
import { SortOrder } from '../../shared/pipes/sort-order';
import { RouterModule } from '@angular/router';
import { SortByPipe } from '../../shared/pipes/sort-by.pipe';

@Component({
  selector: 'bp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    SortByPipe
  ],
  standalone: true
})
export class GenreListComponent {
  genres = input.required<Genre[]>();

  order = SortOrder.Ascending;
}
