import { Component, Input } from '@angular/core';

export class BreadcrumbConfigItem {
  name: string;
  routerLink?: string;
  isActive? = false;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  @Input() config: BreadcrumbConfigItem[];
}
