import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Video } from './models/video';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, OnDestroy {

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  private routeDataSubscription: Subscription;

  videos: Video[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ videos }) => {
      this.videos = videos;
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
