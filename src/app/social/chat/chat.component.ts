import { Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  ircServer = AppSettings.IRC_SERVER;
  ircPort = AppSettings.IRC_PORT;
  ircChannel = AppSettings.IRC_CHANNEL;
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    socialConfigInactive,
    {
      name: 'SOCIAL.CHAT',
      isActive: true
    }
  ];

  chatUrl = 'https://bplounge.hostco.de';

  constructor(
    private translateService: TranslateService
  ) {}

  canExit(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.translateService.get('SOCIAL.CONFIRM_LEAVE_CHAT')
        .subscribe(t => {
          if (confirm(t)) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });

      observer.complete();
    });
  }
}
