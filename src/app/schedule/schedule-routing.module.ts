import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { ShowDetailsResolve } from './show-details.resolve';

const routes: Routes = [
  { path: '', component: ScheduleComponent, pathMatch: 'full' },
  { path: ':id', component: ScheduleComponent },
  { path: 'shows/:id', component: ShowComponent, resolve: { show: ShowDetailsResolve } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
