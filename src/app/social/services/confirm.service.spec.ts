import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

import { ConfirmService } from './confirm.service';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

describe('ConfirmService', () => {
  let service: ConfirmService;
  let confirmSpy: ReturnType<typeof vi.spyOn>;

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

    confirmSpy = vi.spyOn(window, 'confirm');
  });

  afterAll(() => confirmSpy.mockRestore());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit false when cancelled', async () => {
    confirmSpy.mockImplementation(vi.fn(() => false));

    let result = await lastValueFrom(service.confirm(''));

    expect(confirmSpy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  it('should emit true when confirmed', async () => {
    confirmSpy.mockImplementation(vi.fn(() => true));

    let result = await lastValueFrom(service.confirm(''));

    expect(confirmSpy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });
});
