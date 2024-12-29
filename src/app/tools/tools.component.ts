import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-tools',
  templateUrl: './tools.component.html',
  imports: [
    TranslateModule
  ]
})
export class ToolsComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigActive
  ];

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
