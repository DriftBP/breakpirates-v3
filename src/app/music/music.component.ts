import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Genre } from './models/genre';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-music',
  templateUrl: './music.component.html'
})
export class MusicComponent implements OnInit, OnDestroy {

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigActive
  ];

  private routeDataSubscription: Subscription;

  genres: Genre[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ genres }) => {
      this.genres = genres;
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
