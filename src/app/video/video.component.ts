import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from './video';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  videos: Video[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.videos = this.route.snapshot.data['videos'];
  }

}
