import { inject, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfirmService } from './services/confirm.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./social.component').then(mod => mod.SocialComponent),
    pathMatch: 'full'
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then(mod => mod.ChatComponent),
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
