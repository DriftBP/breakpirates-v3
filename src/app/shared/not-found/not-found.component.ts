import { Component } from '@angular/core';

import { BreadcrumbConfigItem } from '../breadcrumb/breadcrumb-config-item';

@Component({
  selector: 'bp-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    {
      name: '404',
      isActive: true
    }
  ];
}
