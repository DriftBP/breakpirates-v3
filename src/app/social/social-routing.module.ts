import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialComponent } from './social.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: SocialComponent, pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
