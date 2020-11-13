import { Component, Input } from '@angular/core';

import { Genre } from '../../music/genre';

@Component({
  selector: 'bp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent {
  @Input() genres: Genre[];

}
