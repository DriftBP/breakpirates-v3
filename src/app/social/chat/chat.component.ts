import { Component, ViewChild, ElementRef, OnInit, OnDestroy, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { socialConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { FullscreenService } from '../services/fullscreen.service';

@Component({
  selector: 'bp-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatIframe') chatElement: ElementRef;

  private recaptchaSubscription: Subscription;
  private recaptchaAction: 'VerifyChat';
  recaptchaError: string;

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

  chatUrl = 'https://thelounge.hostco.de/?join=' + this.ircChannel;
  enableFullscreen = false;
  enableChatClient = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly fullscreenService: FullscreenService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit() {
    this.enableFullscreen = this.fullscreenService.canRequestFullscreen();
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
}
