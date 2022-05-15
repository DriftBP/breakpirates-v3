import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateMyTakeawaySoundboardComponent } from './rate-my-takeaway-soundboard.component';

const routes: Routes = [
  { path: '', component: RateMyTakeawaySoundboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundboardRoutingModule { }
