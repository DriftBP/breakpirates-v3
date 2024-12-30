import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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
    ActiveDirective,
    TranslatePipe
  ]
})
export class BreadcrumbComponent implements OnDestroy {
  private breadcrumbSubscription: Subscription;

  enabled = AppSettings.ENABLE_BREADCRUMB;
  configItems: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly titleService: Title,
    private readonly translateService: TranslateService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly meta: Meta
  ) {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumb$.subscribe(config => {
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
        this.setTitle(activeItem);
      }
    });
  }

  ngOnDestroy() {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
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
        const title = `${t} : Break Pirates - Live Pirate Style Radio`;

        this.titleService.setTitle(title);
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ name: 'twitter:title', content: title });
      });
  }
}
