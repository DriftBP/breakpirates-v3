import { Component, Signal, computed, effect } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService, Translation } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigActive, homeConfigInactive } from './breadcrumb-config';
import { AppSettings } from '../../app-settings';
import { BreadcrumbService } from '../services/breadcrumb/breadcrumb.service';
import { ActiveDirective } from '../directives/active.directive';

@Component({
    selector: 'bp-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    imports: [
      RouterModule,
      TranslatePipe,
      ActiveDirective
    ]
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
      .subscribe((t: Translation) => {
        var title = `${t} : Break Pirates - Live Pirate Style Radio`;

        this.titleService.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ name: 'twitter:title', content: title });
      });
  }
}
