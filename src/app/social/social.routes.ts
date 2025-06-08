import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfirmService } from './services/confirm.service';

export const routes: Routes = [
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
