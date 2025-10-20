import { Component, OnInit, input, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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
        TranslateModule
    ]
})
export class VideoComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  videos = input<Video[]>();

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    videoConfigActive
  ];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
