import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ChatRoomPromoComponent } from './chat-room-promo.component';

describe('ChatRoomPromoComponent', () => {
  let component: ChatRoomPromoComponent;
  let fixture: ComponentFixture<ChatRoomPromoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ChatRoomPromoComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(ChatRoomPromoComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});
