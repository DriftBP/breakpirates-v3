import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MusicService } from '../services/music.service';
import { Show } from '../../schedule/models/show';

export const GenreShowsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Show[]> =>
    {
      const musicService = inject(MusicService);

      return musicService.shows(parseInt(route.paramMap.get('id') ?? '', 10));
    }
