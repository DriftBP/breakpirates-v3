import { Component, ViewChild, ElementRef, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { FullscreenService } from '../services/fullscreen.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'bp-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatIframe') chatElement: ElementRef;

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    socialConfigInactive,
    {
      name: 'SOCIAL.CHAT',
      isActive: true
    }
  ];

  ircServer = AppSettings.IRC_SERVER;
  ircPort = AppSettings.IRC_PORT;
  ircChannel = AppSettings.IRC_CHANNEL;

  chatUrl: SafeResourceUrl;
  enableFullscreen = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly fullscreenService: FullscreenService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const url = `https://thelounge.hostco.de/?join=${this.ircChannel}`;

    this.chatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

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
