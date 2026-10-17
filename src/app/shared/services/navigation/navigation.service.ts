import { Injectable, signal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router = inject(Router);

  private _isCollapsed = signal<boolean>(true);
  public readonly isCollapsed = this._isCollapsed.asReadonly();

  constructor() {
    this.router.events.pipe(
      takeUntilDestroyed()
    ).subscribe(val => {
      if (val instanceof NavigationEnd) {
        this._isCollapsed.set(true);
      }
    });
  }

  setCollapsed(isCollapsed: boolean): void {
    this._isCollapsed.set(isCollapsed);
  }
}
