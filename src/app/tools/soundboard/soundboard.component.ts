import { Component, OnInit } from '@angular/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SampleConfig } from './sample-config';
import { SoundboardService } from './soundboard.service';

@Component({
  selector: 'bp-soundboard',
  templateUrl: './soundboard.component.html'
})
export class SoundboardComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'SOUNDBOARD.TITLE',
      isActive: true
    }
  ];

  configs: SampleConfig[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly soundboardService: SoundboardService
  ) {
    for (var i = 1; i <= 2; i++) {
      this.configs.push({
        id: i,
        name: 'sample ' + i,
        file: 'file' + i + '.mp3',
        loop: true
      });
    }
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.soundboardService.initialise(this.configs);
  }

  onButtonClick(id: number) {
    this.soundboardService.play(id);
  }
}
