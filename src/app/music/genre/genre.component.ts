import { Component, Input } from '@angular/core';

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
  @Input()
  get genre(): Genre | undefined {
    return this._genre;
  }
  set genre(genre: Genre | undefined) {
    if (genre) {
      this._genre = genre;
      this.setBreadcrumb();
    }
  }
  @Input() shows?: Show[];

  private _genre?: Genre;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigInactive
  ];

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.genre?.name ?? '',
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
