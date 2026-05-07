import { Injectable, OnDestroy, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private readonly router = inject(Router);

  private eventsSubscription: Subscription;

  private _isCollapsed = signal<boolean>(true);
  public readonly isCollapsed = this._isCollapsed.asReadonly();

  constructor() {
    this.eventsSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this._isCollapsed.set(true);
      }
    });
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  setCollapsed(isCollapsed: boolean): void {
    this._isCollapsed.set(isCollapsed);
  }
}
