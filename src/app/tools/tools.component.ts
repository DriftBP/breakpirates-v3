import { Component } from '@angular/core';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { toolsConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-tools',
  templateUrl: './tools.component.html'
})
export class ToolsComponent {
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    toolsConfigActive
  ];
}
