import { Injectable, signal } from '@angular/core';

import { IDialogConfig } from './dialog-config';

// eslint-disable-next-line no-var
declare var HTMLDialogElement: Element;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public readonly show = signal<IDialogConfig>(null);

  constructor() { }

  isDialogSupported(): boolean {
    return typeof HTMLDialogElement === 'function';
  }

  showDialog(config: IDialogConfig): void {
    this.show.set(config);
  }
}
