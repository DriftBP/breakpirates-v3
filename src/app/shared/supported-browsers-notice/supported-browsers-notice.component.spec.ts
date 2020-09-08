import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { SupportedBrowsersNoticeComponent } from './supported-browsers-notice.component';
import { SharedModule } from '../shared.module';
import { SupportedBrowsersService } from '../services/supported-browsers.service';

describe('SupportedBrowsersNoticeComponent', () => {
  let shallow: Shallow<SupportedBrowsersNoticeComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(SupportedBrowsersNoticeComponent, SharedModule)
      .mock(SupportedBrowsersService, {
        isBrowserSupported: true
      });
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
