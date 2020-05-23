import { Component, Input } from '@angular/core';

import { BreadcrumbConfigItem } from './breadcrumb-config-item';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  @Input() config: BreadcrumbConfigItem[];
}
