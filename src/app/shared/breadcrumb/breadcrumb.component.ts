import { Component, Signal, computed, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

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
  private readonly titleService = inject(Title);
  private readonly translateService = inject(TranslateService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly meta = inject(Meta);

  enabled = AppSettings.ENABLE_BREADCRUMB;
  configItems: Signal<BreadcrumbConfigItem[]>;

  readonly translatedTitle = computed(() => {
    const activeItem = this.getActiveItem(this.configItems());
    if (!activeItem) return '';
    return this.translateService.instant(activeItem.name) + ' : Break Pirates - Live Pirate Style Radio';
  });

  constructor() {
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
      const title = this.translatedTitle();
      if (title) {
        this.titleService.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ name: 'twitter:title', content: title });
      }
    });
  }

  private getActiveItem(configItems: BreadcrumbConfigItem[]): BreadcrumbConfigItem | undefined {
    return configItems.find((i: BreadcrumbConfigItem) => i.isActive);
  }

  private isHome(config: BreadcrumbConfigItem[]): boolean {
    return config && config.length === 0;
  }
}
