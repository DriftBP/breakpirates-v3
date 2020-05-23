import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from '../video';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigInactive
  ];

  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  video: Video;

  ngOnInit() {
    this.video = this.route.snapshot.data['video'];

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.video?.name,
      isActive: true
    });
  }

}
