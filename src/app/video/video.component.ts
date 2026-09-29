import { Component, OnInit, Signal, computed, input, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTime } from 'luxon';

import { Video } from './models/video';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'bp-video',
    templateUrl: './video.component.html',
    imports: [
        RouterLink,
        TranslatePipe
    ]
})
export class VideoComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  videos = input<Video[]>();
  videosByYear: Signal<{ year: number; videos: Video[] }[]>;

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  constructor() {
    this.videosByYear = computed(() => {
      const videosByYear = new Map<number, Video[]>();

      for (const video of this.videos() ?? []) {
        const year = DateTime.fromSQL(video.date).year;
        const videos = videosByYear.get(year) ?? [];
        videos.push(video);
        videosByYear.set(year, videos);
      }

      return Array.from(videosByYear, ([year, videos]) => ({ year, videos }));
    });
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
