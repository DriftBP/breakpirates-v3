import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class MockTranslateService {
  get() {
    return jest.fn(key => of(key));
  }
}
