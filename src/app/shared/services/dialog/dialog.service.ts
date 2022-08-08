import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IDialogConfig } from './dialog-config';

declare var HTMLDialogElement;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _show: Subject<IDialogConfig> = new Subject();

  public readonly show: Observable<IDialogConfig> = this._show.asObservable();

  constructor() { }

  isDialogSupported(): boolean {
    return typeof HTMLDialogElement === 'function';
  }

  showDialog(config: IDialogConfig): void {
    this._show.next(config);
  }
}
