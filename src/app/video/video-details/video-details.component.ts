import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from '../models/video';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video-details',
  templateUrl: './video-details.component.html'
})
export class VideoDetailsComponent implements OnInit {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  video: Video;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.video = this.route.snapshot.data['video'];

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.video?.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

}
