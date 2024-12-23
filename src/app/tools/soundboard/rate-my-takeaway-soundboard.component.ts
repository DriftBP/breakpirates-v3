import { Component, OnInit } from '@angular/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SoundboardService } from './soundboard.service';
import config from './rate-my-takeaway.json';
import { SoundboardBase } from './soundboard-base';

@Component({
    selector: 'bp-rate-my-takeaway-soundboard',
    templateUrl: './soundboard-base.html',
    styleUrls: ['./soundboard-base.scss'],
    standalone: false
})
export class RateMyTakeawaySoundboardComponent extends SoundboardBase implements OnInit {
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'SOUNDBOARD.TITLE',
      isActive: true
    }
  ];

  constructor(
    override readonly breadcrumbService: BreadcrumbService,
    override readonly soundboardService: SoundboardService
  ) {
    super(breadcrumbService, soundboardService);
  }

  ngOnInit() {
    this.initialise(config.baseDir, config.image, config.samples);
  }
}
