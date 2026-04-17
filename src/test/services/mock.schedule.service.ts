import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Show } from '../../app/schedule/models/show';
import { mockShow } from '../data/mock.shows';

const mockShow2: Show = { ...mockShow, id: 2 };

@Injectable()
export class MockScheduleService {
  get nowPlaying(): Signal<Show> {
    return signal(mockShow2);
  }

  get showProgress() {
    return signal(50);
  }

  shows(): Observable<Show[]> {
    return of([ mockShow ]);
  }
}
