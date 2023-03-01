import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ChatRoomPromoComponent } from './chat-room-promo.component';

describe('ChatRoomPromoComponent', () => {
  let component: ChatRoomPromoComponent;
  let fixture: ComponentFixture<ChatRoomPromoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [ ChatRoomPromoComponent ],
        imports: [
          TranslateModule.forRoot(),
        ]
    });
    fixture = TestBed.createComponent(ChatRoomPromoComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
