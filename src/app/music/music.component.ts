import { Component, OnInit, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { Genre } from './models/genre';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'bp-music',
    templateUrl: './music.component.html',
    imports: [
      RouterLink,
      TranslatePipe
    ]
})
export default class MusicComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  genres = input<Genre[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigActive
  ];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
