import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from './models/genre';
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

  genres: Genre[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.genres = this.route.snapshot.data['genres'];
  }
}
