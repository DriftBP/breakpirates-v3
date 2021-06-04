import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { FullscreenService } from '../services/fullscreen.service';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScreenService } from '../services/screen.service';

@Component({
  selector: 'bp-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatIframe') chatElement: ElementRef;

  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    socialConfigInactive,
    {
      name: 'SOCIAL.CHAT',
      isActive: true
    }
  ];
  private recaptchaSubscription: Subscription;
  private recaptchaAction: 'VerifyChat';

  ircServer = AppSettings.IRC_SERVER;
  ircPort = AppSettings.IRC_PORT;
  ircChannel = AppSettings.IRC_CHANNEL;

  chatUrl: SafeResourceUrl;
  enableFullscreen = false;
  enableChatClient = false;
  enablePreventSleep = false;
  preventSleep = false;
  recaptchaError: string;

  constructor(
    private readonly translateService: TranslateService,
    private readonly fullscreenService: FullscreenService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly sanitizer: DomSanitizer,
    private readonly screenService: ScreenService,
    private readonly recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit() {
    const url = `https://thelounge.hostco.de/?join=${this.ircChannel}`;

    this.chatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.enableFullscreen = this.fullscreenService.canRequestFullscreen;
    this.enablePreventSleep = this.screenService.canPreventSleep;

    this.recaptchaSubscription = this.recaptchaV3Service.execute(this.recaptchaAction)
      .subscribe(
        (token) => {
          this.handleRecaptchaExecute(token);
        },
        (error) => {
          this.recaptchaError = error;
        },
      );
  }

  ngOnDestroy() {
    this.screenService.endPreventSleep();

    if (this.recaptchaSubscription) {
      this.recaptchaSubscription.unsubscribe();
    }
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

  handleRecaptchaExecute(token: string) {
    this.enableChatClient = true;
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
