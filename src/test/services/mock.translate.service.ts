import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockTranslateService {
  get(key: string | string[]): Observable<any> {
    return of(key);
  }
}
