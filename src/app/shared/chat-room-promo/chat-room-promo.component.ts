import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'bp-chat-room-promo',
    templateUrl: './chat-room-promo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      RouterLink,
      TranslatePipe
    ]
})
export class ChatRoomPromoComponent {}
