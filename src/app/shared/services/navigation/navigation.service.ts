import { Injectable, OnDestroy, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private eventsSubscription: Subscription;

  public readonly isCollapsed = signal<boolean>(true);

  constructor(private readonly router: Router) {
    this.eventsSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isCollapsed.set(true);
      }
    });
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  setCollapsed(isCollapsed: boolean): void {
    this.isCollapsed.set(isCollapsed);
  }
}
