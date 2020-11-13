import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { ScheduleResolve } from './schedule.resolve';
import { ShowDetailsResolve } from './show-details.resolve';

const routes: Routes = [
  { path: '', component: ScheduleComponent, resolve: { show: ScheduleResolve }, pathMatch: 'full' },
  { path: ':id', component: ScheduleComponent, resolve: { show: ScheduleResolve } },
  { path: 'shows/:id', component: ShowComponent, resolve: { show: ShowDetailsResolve } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
