import { Component, viewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { FullscreenService } from '../services/fullscreen.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { ScreenService } from '../services/screen.service';

@Component({
    selector: 'bp-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [
      FontAwesomeModule,
      TranslatePipe
    ]
})
export class ChatComponent implements OnInit, OnDestroy {
  chatElement = viewChild.required<ElementRef>('chatIframe');

  faExclamationTriangle = faExclamationTriangle;

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
  enablePreventSleep = false;
  preventSleep = false;

  constructor(
    private readonly fullscreenService: FullscreenService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly sanitizer: DomSanitizer,
    private readonly screenService: ScreenService
  ) {
    const url = `https://thelounge.hostco.de/?join=${this.ircChannel}`;

    this.chatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.enableFullscreen = this.fullscreenService.canRequestFullscreen;
    this.enablePreventSleep = this.screenService.canPreventSleep;
  }

  ngOnDestroy() {
    this.screenService.endPreventSleep();
  }

  fullscreen(): void {
    this.fullscreenService.requestFullscreen(this.chatElement().nativeElement);
  }

  async togglePreventSleep(): Promise<void> {
    this.preventSleep = !this.preventSleep;

    if (this.preventSleep) {
      await this.screenService.startPreventSleep();
    } else {
      await this.screenService.endPreventSleep();
    }
  }
}
