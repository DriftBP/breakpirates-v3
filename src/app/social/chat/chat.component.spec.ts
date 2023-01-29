import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ChatComponent } from './chat.component';
import { MockFullscreenService } from '../../../test/services/mock.fullscreen.service';
import { MockScreenService } from '../../../test/services/mock.screen.service';
import { FullscreenService } from '../services/fullscreen.service';
import { ScreenService } from '../services/screen.service';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ ChatComponent ],
        imports: [
          TranslateModule.forRoot(),
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService
          },
          {
            provide: FullscreenService,
            useClass: MockFullscreenService
          },
          {
            provide: ScreenService,
            useClass: MockScreenService
          }
        ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
