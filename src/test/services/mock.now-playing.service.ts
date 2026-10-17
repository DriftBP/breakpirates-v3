import { Injectable, signal } from '@angular/core';

import { Show } from '../../app/schedule/models/show';
import { mockShow } from '../data/mock.shows';

const mockShow2: Show = { ...mockShow, id: 2 };

@Injectable()
export class MockNowPlayingService {
  readonly nowPlaying = signal<Show | null>(mockShow2);
  readonly showProgress = signal(50);
}
