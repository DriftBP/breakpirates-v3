import { Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { DjNameService } from './services/dj-name.service';
import { AppSettings } from '../../app-settings';

@Component({
    selector: 'bp-releases',
    templateUrl: './dj-name.component.html',
    styleUrls: ['./dj-name.scss'],
    imports: [
        TranslateModule,
        NgOptimizedImage
    ],
    providers: [
        DjNameService
    ]
})
export default class DjNameComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly djNameService = inject(DjNameService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigInactive,
    {
      name: 'DJ_NAME.TITLE',
      isActive: true
    }
  ];

  imagePath = AppSettings.ASSET_TOOLS;
  generated: boolean = false;
  animal: string = '';
  number: number = 0;
  shape: string = '';

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  generate() {
    this.animal = this.djNameService.getAnimal();
    this.number = this.djNameService.getNumber();
    this.shape = this.djNameService.getShape();

    this.generated = true;
  }
}
