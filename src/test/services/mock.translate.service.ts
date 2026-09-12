import { Injectable } from '@angular/core';
import { Translation } from '@ngx-translate/core';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class MockTranslateService {
  readonly onTranslationChange = EMPTY;
  readonly onLangChange = EMPTY;
  readonly onFallbackLangChange = EMPTY;

  instant(key: string | string[]): Translation {
    return key;
  }

  get(key: string | string[]): Observable<Translation> {
    return of(key);
  }
}
