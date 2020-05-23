import { Component } from '@angular/core';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { homeConfigInactive, toolsConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html'
})
export class ToolsComponent {
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    homeConfigInactive,
    toolsConfigActive
  ];
}
