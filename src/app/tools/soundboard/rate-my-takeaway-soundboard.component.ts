import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { SoundboardService } from './soundboard.service';
import config from './rate-my-takeaway.json';
import { SoundboardBase } from './soundboard-base';
import { SampleButtonComponent } from './sample-button/sample-button.component';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
    selector: 'bp-rate-my-takeaway-soundboard',
    templateUrl: './soundboard-base.html',
    styleUrls: ['./soundboard-base.scss'],
    imports: [
      SampleButtonComponent,
      TranslatePipe,
      SafePipe
    ],
    providers: [
      SoundboardService
    ]
})
export class RateMyTakeawaySoundboardComponent extends SoundboardBase implements OnInit {
  declare breadcrumbService: BreadcrumbService;
  declare soundboardService: SoundboardService;

  breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'SOUNDBOARD.TITLE',
      isActive: true
    }
  ];

  constructor() {
    const breadcrumbService = inject(BreadcrumbService);
    const soundboardService = inject(SoundboardService);

    super(breadcrumbService, soundboardService);

    this.breadcrumbService = breadcrumbService;
    this.soundboardService = soundboardService;
  }

  ngOnInit() {
    this.initialise(config.baseDir, config.image, config.samples);
  }
}
