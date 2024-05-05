import { Component, OnInit, input } from '@angular/core';

import { Genre } from './models/genre';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-music',
  templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit {
  genres = input<Genre[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigActive
  ];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
