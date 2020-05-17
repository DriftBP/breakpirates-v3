import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private _isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public readonly isCollapsed: Observable<boolean> = this._isCollapsed.asObservable();

  private eventsSubscription: Subscription;

  constructor(private readonly router: Router) {
    this.eventsSubscription = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this._isCollapsed.next(true);
      }
    });
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  setCollapsed(isCollapsed: boolean): void {
    this._isCollapsed.next(isCollapsed);
  }
}
