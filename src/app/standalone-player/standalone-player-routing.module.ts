import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandalonePlayerComponent } from './standalone-player.component';

const routes: Routes = [
  { path: '', component: StandalonePlayerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandalonePlayerRoutingModule { }
