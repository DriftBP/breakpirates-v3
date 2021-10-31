import { Component, OnInit } from '@angular/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SoundboardService } from './soundboard.service';
import config from './rate-my-takeaway.json';
import { SoundboardBase } from './soundboard-base';

@Component({
  selector: 'bp-soundboard',
  templateUrl: './soundboard-base.html',
  styleUrls: ['./soundboard-base.scss']
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
    readonly breadcrumbService: BreadcrumbService,
    readonly soundboardService: SoundboardService
  ) {
    super(breadcrumbService, soundboardService);
  }

  ngOnInit() {
    this.initialise(config.baseDir, config.image, config.samples);
  }
}
