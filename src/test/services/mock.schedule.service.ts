import { Injectable, WritableSignal, signal } from '@angular/core';

import { Show } from '../../app/schedule/models/show';
import { mockShow } from '../data/mock.shows';

const mockShow2: Show = { ...mockShow, id: 2 };

@Injectable()
export class MockScheduleService {
  get nowPlaying(): WritableSignal<Show> {
    return signal(mockShow2);
  }

  get showProgress() {
    return signal(50);
  }

  shows(): WritableSignal<Show[]> {
    return signal([ mockShow ]);
  }
}
