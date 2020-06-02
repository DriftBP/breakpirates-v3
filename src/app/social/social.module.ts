import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { ChatComponent } from './chat/chat.component';
import { SocialRoutingModule } from './social-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateChat } from './chat/can-deactivate-chat';

@NgModule({
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule
  ],
  declarations: [
    SocialComponent,
    ChatComponent
  ],
  providers: [
    CanDeactivateChat
  ]
})
export class SocialModule { }
