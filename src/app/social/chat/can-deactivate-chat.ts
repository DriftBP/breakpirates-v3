import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ChatComponent } from './chat.component';

@Injectable()
export class CanDeactivateChat implements CanDeactivate<ChatComponent> {
  component: Object;
  route: ActivatedRouteSnapshot;

  constructor() {}

  canDeactivate(
    component: ChatComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return component.canExit().pipe(first());
  }
}
