import { Component, OnInit, input } from '@angular/core';

import { Video } from './models/video';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit {
  videos = input<Video[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
