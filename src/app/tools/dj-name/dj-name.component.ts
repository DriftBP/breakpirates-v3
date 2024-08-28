import { Component, OnInit } from '@angular/core';

import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { DjNameService } from './services/dj-name.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-releases',
  templateUrl: './dj-name.component.html',
  styleUrls: ['./dj-name.scss']
})
export class DjNameComponent implements OnInit {
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

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly djNameService: DjNameService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  generate() {
    this.animal = this.djNameService.getRandomAnimal();
    this.number = this.djNameService.getRandomNumber();
    this.shape = this.djNameService.getRandomShape();

    this.generated = true;
  }
}