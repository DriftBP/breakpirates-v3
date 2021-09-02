import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BpmComponent } from './bpm.component';

const routes: Routes = [
  { path: '', component: BpmComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmRoutingModule { }
