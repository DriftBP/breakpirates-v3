import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SupportedBrowsersNoticeComponent } from './supported-browsers-notice.component';

describe('SupportedBrowsersNoticeComponent', () => {
  let component: SupportedBrowsersNoticeComponent;
  let fixture: ComponentFixture<SupportedBrowsersNoticeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ SupportedBrowsersNoticeComponent ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(SupportedBrowsersNoticeComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
