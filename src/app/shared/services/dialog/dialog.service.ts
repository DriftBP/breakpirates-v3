import { Injectable, signal } from '@angular/core';

import { IDialogConfig } from './dialog-config';

declare const HTMLDialogElement: any;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public readonly show = signal<IDialogConfig | null>(null);

  constructor() { }

  isDialogSupported(): boolean {
    return typeof HTMLDialogElement === 'function';
  }

  showDialog(config: IDialogConfig): void {
    this.show.set(config);
  }
}
