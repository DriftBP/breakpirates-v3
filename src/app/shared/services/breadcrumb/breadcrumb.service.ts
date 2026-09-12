import { Injectable, signal } from '@angular/core';

import { BreadcrumbConfigItem } from '../../breadcrumb/breadcrumb-config-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumb = signal<BreadcrumbConfigItem[] | null>(null);
  public readonly breadcrumb = this._breadcrumb.asReadonly();

  setBreadcrumb(config: BreadcrumbConfigItem[]): void {
    this._breadcrumb.set(config);
  }
}
