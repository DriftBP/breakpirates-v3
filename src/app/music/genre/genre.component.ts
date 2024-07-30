import { Component, effect, input } from '@angular/core';

import { Genre } from '../models/genre';
import { Show } from '../../schedule/models/show';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-genre',
  templateUrl: './genre.component.html'
})
export class GenreComponent {
  genre = input<Genre>();
  shows = input<Show[]>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigInactive
  ];

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) {
    effect(() => {
      const genre = this.genre();

      if (genre) {
        this.setBreadcrumb(genre);
      }
    }, { allowSignalWrites: true });
  }

  setBreadcrumb(genre: Genre): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: genre.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
