import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MusicService } from '../services/music.service';
import { Genre } from '../models/genre';

export const GenresResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Genre[]> =>
    {
      const musicService = inject(MusicService);

      return musicService.genres();
    }
