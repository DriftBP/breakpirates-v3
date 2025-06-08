import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfirmService } from './services/confirm.service';
import { ScreenService } from './services/screen.service';
import { FullscreenService } from './services/fullscreen.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      ConfirmService,
      FullscreenService,
      ScreenService
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./social.component'),
        pathMatch: 'full'
      },
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat.component'),
        canDeactivate: [
          () => inject(ConfirmService).confirm('SOCIAL.CONFIRM_LEAVE_CHAT').pipe(first())
        ]
      }
    ]
  }
];
