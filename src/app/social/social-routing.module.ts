import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialComponent } from './social.component';
import { ChatComponent } from './chat/chat.component';
import { first } from 'rxjs/operators';

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
      (component: ChatComponent) => component.canExit().pipe(first())
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
