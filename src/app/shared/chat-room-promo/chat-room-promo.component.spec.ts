import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockTranslateService } from '../../../test/services/mock.translate.service';

import { ChatRoomPromoComponent } from './chat-room-promo.component';

describe('ChatRoomPromoComponent', () => {
  let component: ChatRoomPromoComponent;
  let fixture: ComponentFixture<ChatRoomPromoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ChatRoomPromoComponent,
        TranslatePipe
      ],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
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
