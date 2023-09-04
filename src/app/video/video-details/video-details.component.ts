import { Component, Input } from '@angular/core';

import { Video } from '../models/video';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { videoConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-video-details',
  templateUrl: './video-details.component.html'
})
export class VideoDetailsComponent {
  @Input()
  get video(): Video {
    return this._video;
  }
  set video(video: Video) {
    if (video) {
      this._video = video;
      this.setBreadcrumb();
    }
  }

  private _video: Video;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.video?.name,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
