import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { ScheduleResolve } from './schedule.resolve';
import { ShowDetailsResolve } from './show-details.resolve';

const routes: Routes = [
  { path: '', component: ScheduleComponent, children: [
    { path: '', component: DayScheduleComponent, resolve: { show: ScheduleResolve } },
    { path: ':id', component: DayScheduleComponent, resolve: { show: ScheduleResolve } },
  ] },
  { path: 'shows/:id', component: ShowComponent, resolve: { show: ShowDetailsResolve } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
