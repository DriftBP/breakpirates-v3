import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Genre } from '../../music/models/genre';

@Component({
  selector: 'bp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreListComponent {
  @Input() genres: Genre[];

}
