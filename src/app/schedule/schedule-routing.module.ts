import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { ScheduleResolver } from './resolvers/schedule.resolver';
import { ShowDetailsResolver } from './resolvers/show-details.resolver';
import { TodaysScheduleResolver } from './resolvers/todays-schedule.resolver';
import { DaysResolver } from './resolvers/days.resolver';


const routes: Routes = [
  { path: '', component: ScheduleComponent, resolve: { days: DaysResolver }, children: [
    { path: '', component: DayScheduleComponent, resolve: { schedule: TodaysScheduleResolver } },
    { path: ':id', component: DayScheduleComponent, resolve: { schedule: ScheduleResolver } },
  ] },
  { path: 'shows/:id', component: ShowComponent, resolve: { show: ShowDetailsResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
