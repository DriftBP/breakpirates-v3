import { Injectable, signal } from '@angular/core';

import { BreadcrumbConfigItem } from '../../breadcrumb/breadcrumb-config-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public readonly breadcrumb = signal<BreadcrumbConfigItem[]>(null);

  setBreadcrumb(config: BreadcrumbConfigItem[]): void {
    this.breadcrumb.set(config);
  }
}
