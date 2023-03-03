import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockTranslateService {
  get(key: any): any {
    return of(key);
  }
}
