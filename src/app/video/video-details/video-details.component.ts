import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Video } from '../models/video';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video-details',
  templateUrl: './video-details.component.html'
})
export class VideoDetailsComponent implements OnInit, OnDestroy {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  private routeDataSubscription: Subscription;

  video: Video;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ video }) => {
      this.video = video;

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
      name: this.video?.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
