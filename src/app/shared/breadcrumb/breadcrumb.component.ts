import { Component, Input, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'lodash';

import { BreadcrumbConfigItem } from './breadcrumb-config-item';
import { homeConfigActive, homeConfigInactive } from './breadcrumb-config';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnChanges {
  @Input() config: BreadcrumbConfigItem[];
  @Input() isHome = false;

  enabled = AppSettings.ENABLE_BREADCRUMB;
  configItems: BreadcrumbConfigItem[];

  constructor(
    private titleService: Title,
    private translateService: TranslateService
  ) {}

  ngOnChanges() {
    if (this.isHome) {
      this.configItems = [homeConfigActive].concat(this.config);
    } else {
      this.configItems = [homeConfigInactive].concat(this.config);
    }

    // Set page title to the translated value of the last breadcrumb item
    const activeItem = this.getActiveItem(this.configItems);

    if (activeItem) {
      this.translateService.get(activeItem.name)
        .subscribe(t => this.titleService.setTitle(`Break Pirates : ${t} - Live Pirate Style Radio`));
    }
  }

  private getActiveItem(configItems: BreadcrumbConfigItem[]): BreadcrumbConfigItem {
    return find(configItems, (i: BreadcrumbConfigItem) => i.isActive);
  }
}
