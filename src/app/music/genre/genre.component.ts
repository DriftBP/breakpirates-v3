import { Component, effect, input, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Genre } from '../models/genre';
import { Show } from '../../schedule/models/show';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ShowSummaryComponent } from '../../schedule/show-summary/show-summary.component';

@Component({
    selector: 'bp-genre',
    templateUrl: './genre.component.html',
    imports: [
      ShowSummaryComponent,
      TranslatePipe
    ]
})
export default class GenreComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);

  genre = input<Genre>();
  shows = input<Show[]>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigInactive
  ];

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor() {
    effect(() => {
      const genre = this.genre();

      if (genre) {
        this.setBreadcrumb(genre);
      }
    });
  }

  setBreadcrumb(genre: Genre): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: genre.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
