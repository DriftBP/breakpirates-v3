import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { DonateComponent } from '../donate/donate.component';
import { ContentBoxComponent } from '../content-box/content-box.component';
import { ChatRoomPromoComponent } from '../chat-room-promo/chat-room-promo.component';
import { DownloadAppComponent } from '../download-app/download-app.component';

@Component({
    selector: 'bp-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [
      DownloadAppComponent,
      DonateComponent,
      ContentBoxComponent,
      ChatRoomPromoComponent,
      TranslatePipe
    ]
})
export class SidebarComponent { }
