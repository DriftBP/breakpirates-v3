import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { ScheduleResolve } from './resolves/schedule.resolve';
import { ShowDetailsResolve } from './resolves/show-details.resolve';
import { TodaysScheduleResolve } from './resolves/todays-schedule.resolve';
import { DaysResolve } from './resolves/days.resolve';
import { ScheduleResolvesModule } from './resolves/schedule-resolves.module';
import { validDayGuard } from './guards/valid-day.guard';

const routes: Routes = [
  { path: '', component: ScheduleComponent, resolve: { days: DaysResolve }, children: [
    { path: '', component: DayScheduleComponent, resolve: { schedule: TodaysScheduleResolve } },
    { path: ':day', component: DayScheduleComponent, canActivate: [validDayGuard()], resolve: { schedule: ScheduleResolve } },
  ] },
  { path: 'shows/:id', component: ShowComponent, resolve: { show: ShowDetailsResolve } }
];

@NgModule({
  imports: [
    ScheduleResolvesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
