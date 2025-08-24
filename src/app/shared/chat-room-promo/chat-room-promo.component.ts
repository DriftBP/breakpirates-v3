import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'bp-chat-room-promo',
    templateUrl: './chat-room-promo.component.html',
    imports: [
      RouterModule,
      TranslatePipe
    ]
})
export class ChatRoomPromoComponent {}
