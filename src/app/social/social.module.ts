import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SocialRoutingModule } from './social-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SocialService } from './services/social.service';
import { FullscreenService } from './services/fullscreen.service';
import { ScreenService } from './services/screen.service';
import { ConfirmService } from './services/confirm.service';

@NgModule({
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    SocialService,
    FullscreenService,
    ScreenService,
    ConfirmService
  ]
})
export class SocialModule { }
