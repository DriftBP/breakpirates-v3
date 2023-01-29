import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockRouterService {
  get events() {
    return of();
  }
}
