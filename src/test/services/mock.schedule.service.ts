import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

import { Show } from '../../app/schedule/models/show';
import { mockShow } from '../data/mock.shows';

const mockShow2: Show = { ...mockShow, id: 2 };

@Injectable()
export class MockScheduleService {
  get nowPlaying$(): Observable<Show> {
    return from([mockShow, mockShow2]);
  }

  get showProgress$() {
    return of(50);
  }

  shows(dayId: number): Observable<Show[]> {
      return of([ mockShow ]);
  }
}
