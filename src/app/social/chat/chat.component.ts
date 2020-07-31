import { Component, ViewChild, ElementRef, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { FullscreenService } from '../services/fullscreen.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatIframe') chatElement: ElementRef;

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
  enableFullscreen = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly fullscreenService: FullscreenService
  ) {}

  ngOnInit() {
    this.enableFullscreen = this.fullscreenService.canRequestFullscreen();
  }

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

  fullscreen(): void {
    this.fullscreenService.requestFullscreen(this.chatElement.nativeElement);
  }
}
