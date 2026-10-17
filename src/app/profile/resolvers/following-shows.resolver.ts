import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin, map, of } from 'rxjs';

import { Show } from '../../schedule/models/show';
import { ScheduleService } from '../../schedule/services/schedule.service';
import { FollowedProfilesService } from '../services/followed-profiles.service';

export const followingShowsResolver: ResolveFn<Show[]> = () => {
  const followedIds = inject(FollowedProfilesService).followedIds();

  if (followedIds.length === 0) {
    return of([]);
  }

  const scheduleService = inject(ScheduleService);
  const weekdaySchedules = Array.from({ length: 7 }, (_, index) => scheduleService.shows(index + 1));

  return forkJoin(weekdaySchedules).pipe(
    map(schedules => schedules.flat())
  );
};
