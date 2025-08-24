import { Routes } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ShowComponent } from './show/show.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { scheduleResolver } from './resolvers/schedule.resolver';
import { showDetailsResolver } from './resolvers/show-details.resolver';
import { todaysScheduleResolver } from './resolvers/todays-schedule.resolver';
import { daysResolver } from './resolvers/days.resolver';
import { validDayGuard } from './guards/valid-day.guard';

export const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    resolve: {
      days: daysResolver
    },
    children: [
      {
        path: '',
        component: DayScheduleComponent,
        resolve: {
          schedule: todaysScheduleResolver
        }
      },
      {
        path: ':day',
        component: DayScheduleComponent,
        canActivate: [
          validDayGuard()
        ],
        resolve: {
          schedule: scheduleResolver
        }
      },
    ]
  },
  {
    path: 'shows/:id',
    component: ShowComponent,
    resolve: {
      show: showDetailsResolver
    }
  }
];
