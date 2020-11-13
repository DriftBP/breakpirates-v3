import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from './video';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  videos: Video[];

  ngOnInit() {
    this.videos = this.route.snapshot.data['videos'];
  }

}
