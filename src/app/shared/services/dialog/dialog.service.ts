import { Injectable, signal } from '@angular/core';

import { IDialogConfig } from './dialog-config';

declare var HTMLDialogElement: any;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _show = signal<IDialogConfig | null>(null);
  public readonly show = this._show.asReadonly();

  constructor() { }

  isDialogSupported(): boolean {
    return typeof HTMLDialogElement === 'function';
  }

  showDialog(config: IDialogConfig): void {
    this._show.set(config);
  }
}
