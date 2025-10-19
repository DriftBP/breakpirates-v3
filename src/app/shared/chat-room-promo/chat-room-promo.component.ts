import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'bp-chat-room-promo',
    templateUrl: './chat-room-promo.component.html',
    imports: [
      RouterLink,
      TranslatePipe
    ]
})
export class ChatRoomPromoComponent {}
