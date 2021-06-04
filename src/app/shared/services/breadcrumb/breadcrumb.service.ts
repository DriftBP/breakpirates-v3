import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BreadcrumbConfigItem } from '../../breadcrumb/breadcrumb-config-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private _breadcrumb: BehaviorSubject<BreadcrumbConfigItem[]> = new BehaviorSubject(null);

  public readonly breadcrumb$: Observable<BreadcrumbConfigItem[]> = this._breadcrumb.asObservable();

  setBreadcrumb(config: BreadcrumbConfigItem[]): void {
    this._breadcrumb.next(config);
  }
}
