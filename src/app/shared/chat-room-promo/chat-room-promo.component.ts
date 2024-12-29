import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'bp-chat-room-promo',
  templateUrl: './chat-room-promo.component.html',
  imports: [
    TranslatePipe
  ]
})
export class ChatRoomPromoComponent {}
