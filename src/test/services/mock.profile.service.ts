import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { mockShow } from '../data/mock.shows';
import { Show } from '../../app/schedule/models/show';

@Injectable()
export class MockProfileService {
  profileShows(): Observable<Show[]> {
    return of([mockShow])
  }
}
