import { Component, Signal, computed, effect } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigActive, homeConfigInactive } from './breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  enabled = AppSettings.ENABLE_BREADCRUMB;
  configItems: Signal<BreadcrumbConfigItem[]>;

  constructor(
    private readonly titleService: Title,
    private readonly translateService: TranslateService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly meta: Meta
  ) {
    this.configItems = computed(() => {
      var config = this.breadcrumbService.breadcrumb();

      if (!config) {
        config = [];
      }

      if (this.isHome(config)) {
        return [homeConfigActive].concat(config);
      } else {
        return [homeConfigInactive].concat(config);
      }
    });

    effect(() => {
      // Set page title to the translated value of the last breadcrumb item
      const activeItem = this.getActiveItem(this.configItems());

      if (activeItem) {
        this.setTitle(activeItem);
      }
    });
  }

  private getActiveItem(configItems: BreadcrumbConfigItem[]): BreadcrumbConfigItem | undefined {
    return configItems.find((i: BreadcrumbConfigItem) => i.isActive);
  }

  private isHome(config: BreadcrumbConfigItem[]): boolean {
    return config && config.length === 0;
  }

  private setTitle(activeItem: BreadcrumbConfigItem): void {
    this.translateService.get(activeItem.name)
      .subscribe(t => {
        var title = `${t} : Break Pirates - Live Pirate Style Radio`;

        this.titleService.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ name: 'twitter:title', content: title });
      });
  }
}
