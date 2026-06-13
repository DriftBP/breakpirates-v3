import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { DonateComponent } from '../donate/donate.component';
import { ContentBoxComponent } from '../content-box/content-box.component';
import { ChatRoomPromoComponent } from '../chat-room-promo/chat-room-promo.component';

@Component({
    selector: 'bp-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      DonateComponent,
      ContentBoxComponent,
      ChatRoomPromoComponent,
      TranslatePipe
    ]
})
export class SidebarComponent { }
