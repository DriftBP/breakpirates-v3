import { Component, OnInit } from '@angular/core';
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
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    {
      name: '404',
      isActive: true
    }
  ];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
