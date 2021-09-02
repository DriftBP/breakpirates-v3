import { Component, OnInit } from '@angular/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SampleConfig } from './sample-config';
import { SoundboardService } from './soundboard.service';
import config from './config.json';
import { AppSettings } from '../../../app/app-settings';

@Component({
  selector: 'bp-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'SOUNDBOARD.TITLE',
      isActive: true
    }
  ];

  imagePath: string;
  configs: SampleConfig[] = [];

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly soundboardService: SoundboardService
  ) {
    this.configs = config.samples;
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
    this.imagePath = `url('${AppSettings.ASSET_SHOW_SOUND}${config.baseDir}/${config.image}')`;
    this.soundboardService.initialise(config.baseDir, this.configs);
  }

  onButtonClick(id: number) {
    this.soundboardService.play(id);
  }
}
