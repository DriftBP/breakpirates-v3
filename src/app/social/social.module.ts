import { NgModule } from '@angular/core';

import { SocialRoutingModule } from './social-routing.module';
import { SocialService } from './services/social.service';
import { FullscreenService } from './services/fullscreen.service';
import { ScreenService } from './services/screen.service';
import { ConfirmService } from './services/confirm.service';

@NgModule({
  imports: [
    SocialRoutingModule
  ],
  providers: [
    SocialService,
    FullscreenService,
    ScreenService,
    ConfirmService
  ]
})
export class SocialModule { }
