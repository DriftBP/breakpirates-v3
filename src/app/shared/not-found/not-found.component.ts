import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'bp-not-found',
    templateUrl: './not-found.component.html',
    imports: [
      TranslatePipe
    ]
})
export class NotFoundComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    {
      name: '404',
      isActive: true
    }
  ];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
