import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'bp-tools',
    templateUrl: './tools.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      RouterLink,
      TranslatePipe
    ]
})
export class ToolsComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigActive
  ];

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
