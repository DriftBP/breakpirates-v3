import { Injectable } from '@angular/core';
import { Translation } from '@ngx-translate/core';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class MockTranslateService {
  readonly onTranslationChange = EMPTY;
  readonly onLangChange = EMPTY;
  readonly onFallbackLangChange = EMPTY;

  instant(key: string | string[]): Translation {
    return Array.isArray(key) ? key.join(', ') : key;
  }

  get(key: string | string[]): Observable<Translation> {
    return of(this.instant(key));
  }

  translate(key: string | string[] | (() => string | string[])): () => Translation {
    const resolvedKey = typeof key === 'function' ? key() : key;
    return () => this.instant(resolvedKey);
  }
}
