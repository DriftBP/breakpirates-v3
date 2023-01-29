import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

import { Show } from '../../app/schedule/models/show';

const mockShow1: Show = {
  id: 1,
  title: 'title',
  start_time: '00:00:00',
  end_time: '00:00:00',
  day_id: 1,
  genres: [],
  hosts: []
};
const mockShow2: Show = { ...mockShow1, id: 2 };

@Injectable()
export class MockScheduleService {
  get nowPlaying$(): Observable<Show> {
    return from([mockShow1, mockShow2]);
  }

  get showProgress$() {
    return of(50);
  }

  shows(dayId: number): Observable<Show[]> {
      return of([ mockShow1 ]);
  }
}
