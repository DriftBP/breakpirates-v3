import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SoundboardService } from './soundboard.service';
import config from './rate-my-takeaway.json';
import { SoundboardBase } from './soundboard-base';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { SampleButtonComponent } from './sample-button/sample-button.component';

@Component({
  selector: 'bp-rate-my-takeaway-soundboard',
  templateUrl: './soundboard-base.html',
  styleUrls: ['./soundboard-base.scss'],
  imports: [
    TranslateModule,
    SafePipe,
    SampleButtonComponent
  ]
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
