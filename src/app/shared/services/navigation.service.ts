import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public readonly isCollapsed: Observable<boolean> = this._isCollapsed.asObservable();

  constructor(private readonly router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this._isCollapsed.next(true);
      }
    });
  }

  setCollapsed(isCollapsed: boolean): void {
    this._isCollapsed.next(isCollapsed);
  }
}
