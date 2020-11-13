import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from './genre';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  breadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigActive
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  genres: Genre[];

  ngOnInit() {
    this.genres = this.route.snapshot.data['genres'];
  }

}
