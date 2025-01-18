import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { MusicService } from '../services/music.service';
import { Show } from '../../schedule/models/show';

export const GenreShowsResolver: ResolveFn<Observable<Show[]>> =
  (route: ActivatedRouteSnapshot): Observable<Show[]> =>
    {
      const musicService = inject(MusicService);

      return musicService.shows(parseInt(route.paramMap.get('id') ?? '', 10));
    }
