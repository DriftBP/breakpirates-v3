import { Component, Input, OnChanges } from '@angular/core';

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

  ngOnChanges() {
    if (this.isHome) {
      this.configItems = [homeConfigActive].concat(this.config);
    } else {
      this.configItems = [homeConfigInactive].concat(this.config);
    }
  }
}
