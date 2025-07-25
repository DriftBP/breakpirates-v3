import { Component, input, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Video } from '../models/video';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
    selector: 'bp-video-details',
    templateUrl: './video-details.component.html',
    imports: [
        TranslateModule,
        SafePipe
    ]
})
export class VideoDetailsComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);

  video = input<Video>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor() {
    effect(() => {
      const video = this.video();

      if (video) {
        this.setBreadcrumb(video);
      }
    });
  }

  setBreadcrumb(video: Video): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: video.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
