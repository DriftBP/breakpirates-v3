import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { MusicService } from '../services/music.service';
import { Genre } from '../models/genre';

export const GenreResolver: ResolveFn<Observable<Genre>> =
  (route: ActivatedRouteSnapshot): Observable<Genre> =>
    {
      const musicService = inject(MusicService);

      return musicService.genre(parseInt(route.paramMap.get('id') ?? '', 10));
    }
