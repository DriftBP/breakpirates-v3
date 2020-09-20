import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IDialogConfig } from './dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _show: BehaviorSubject<IDialogConfig> = new BehaviorSubject(null);

  public readonly show: Observable<IDialogConfig> = this._show.asObservable();

  constructor() { }

  isDialogSupported(): boolean {
    return typeof HTMLDialogElement === 'function';
  }

  showDialog(config: IDialogConfig): void {
    this._show.next(config);
  }
}
