import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DjNameComponent } from './dj-name.component';

const routes: Routes = [
  { path: '', component: DjNameComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DjNameRoutingModule { }
