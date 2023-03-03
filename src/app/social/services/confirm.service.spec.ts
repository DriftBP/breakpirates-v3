import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmService } from './confirm.service';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

describe('ConfirmService', () => {
  let service: ConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfirmService,
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });

    service = TestBed.inject(ConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
