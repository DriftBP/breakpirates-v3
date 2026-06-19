import { Injectable } from '@angular/core';
import { Translation } from '@ngx-translate/core';

@Injectable()
export class MockTranslateService {
  instant(key: string | string[]): Translation {
    return key;
  }
}
