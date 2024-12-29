import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ChatRoomPromoComponent } from '../chat-room-promo/chat-room-promo.component';
import { DonateComponent } from '../donate/donate.component';
import { ContentBoxComponent } from '../content-box/content-box.component';

@Component({
  selector: 'bp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    ChatRoomPromoComponent,
    DonateComponent,
    ContentBoxComponent,
    TranslatePipe
  ]
})
export class SidebarComponent { }
