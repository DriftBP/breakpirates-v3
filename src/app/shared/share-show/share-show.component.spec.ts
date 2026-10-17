import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { MockTranslateService } from '../../../test/services/mock.translate.service';
import { ShareShowComponent } from './share-show.component';

describe('ShareShowComponent', () => {
  let fixture: ComponentFixture<ShareShowComponent>;
  let originalShareDescriptor: PropertyDescriptor | undefined;
  let originalClipboardDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalShareDescriptor = Object.getOwnPropertyDescriptor(navigator, 'share');
    originalClipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

    TestBed.configureTestingModule({
      imports: [ShareShowComponent],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        }
      ]
    });

    fixture = TestBed.createComponent(ShareShowComponent);
    fixture.componentRef.setInput('show', {
      id: 42,
      title: 'Test Show',
      start_time: '',
      end_time: '',
      day_id: 1,
      genres: [],
      hosts: []
    });
  });

  afterEach(() => {
    if (originalShareDescriptor) {
      Object.defineProperty(navigator, 'share', originalShareDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'share');
    }

    if (originalClipboardDescriptor) {
      Object.defineProperty(navigator, 'clipboard', originalClipboardDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  it('copies the show page URL instead of the current page URL', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Reflect.deleteProperty(navigator, 'share');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });

    await fixture.componentInstance.shareShow();

    expect(writeText).toHaveBeenCalledWith('https://www.breakpirates.com/schedule/shows/42');
  });
});
