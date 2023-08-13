import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Genre } from '../models/genre';
import { Show } from '../../schedule/models/show';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { musicConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-genre',
  templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit, OnDestroy {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    musicConfigInactive
  ];

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  private routeDataSubscription: Subscription;

  genre: Genre;
  shows: Show[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ genre, shows }) => {
      this.genre = genre;
      this.shows = shows;

      this.setBreadcrumb();
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.genre.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
