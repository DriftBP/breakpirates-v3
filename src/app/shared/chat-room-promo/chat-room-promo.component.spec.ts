import { waitForAsync } from '@angular/core/testing';
import { Shallow } from 'shallow-render';

import { ChatRoomPromoComponent } from './chat-room-promo.component';
import { SharedModule } from '../shared.module';

describe('ChatRoomPromoComponent', () => {
  let shallow: Shallow<ChatRoomPromoComponent>;

  beforeEach(waitForAsync(() => {
    shallow = new Shallow(ChatRoomPromoComponent, SharedModule);
  }));

  it('should create', async () => {
    const { element } = await shallow.render();

    expect(element.nativeElement).toBeTruthy();
  });
});
