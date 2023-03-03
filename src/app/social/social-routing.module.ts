import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';

import { SocialComponent } from './social.component';
import { ChatComponent } from './chat/chat.component';
import { ConfirmService } from './services/confirm.service';

const routes: Routes = [
  {
    path: '',
    component: SocialComponent,
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: ChatComponent,
    canDeactivate: [
      () => inject(ConfirmService).confirm('SOCIAL.CONFIRM_LEAVE_CHAT').pipe(first())
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
