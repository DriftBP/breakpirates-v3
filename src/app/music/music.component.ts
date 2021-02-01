import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from './genre';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigActive
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  genres: Genre[];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.genres = this.route.snapshot.data['genres'];
  }

}
