import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BreadcrumbConfigItem } from '../../breadcrumb/breadcrumb-config-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumb: BehaviorSubject<BreadcrumbConfigItem[] | null> = new BehaviorSubject<BreadcrumbConfigItem[] | null>(null);

  public readonly breadcrumb$: Observable<BreadcrumbConfigItem[] | null> = this._breadcrumb.asObservable();

  setBreadcrumb(config: BreadcrumbConfigItem[]): void {
    this._breadcrumb.next(config);
  }
}
