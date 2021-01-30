import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigActive, homeConfigInactive } from './breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  private breadcrumbSubscription: Subscription;

  enabled = AppSettings.ENABLE_BREADCRUMB;
  configItems: BreadcrumbConfigItem[];

  constructor(
    private readonly titleService: Title,
    private readonly translateService: TranslateService,
    private readonly breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumb.subscribe(config => {
      if (!config) {
        config = [];
      }

      if (this.isHome(config)) {
        this.configItems = [homeConfigActive].concat(config);
      } else {
        this.configItems = [homeConfigInactive].concat(config);
      }

      // Set page title to the translated value of the last breadcrumb item
      const activeItem = this.getActiveItem(this.configItems);

      if (activeItem) {
        this.translateService.get(activeItem.name)
          .subscribe(t => this.titleService.setTitle(`${t} : Break Pirates - Live Pirate Style Radio`));
      }
    });
  }

  ngOnDestroy() {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

  private getActiveItem(configItems: BreadcrumbConfigItem[]): BreadcrumbConfigItem {
    return configItems.find((i: BreadcrumbConfigItem) => i.isActive);
  }

  private isHome(config: BreadcrumbConfigItem[]): boolean {
    return config && config.length === 0;
  }
}
