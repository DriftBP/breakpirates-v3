import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { MusicService } from '../services/music.service';
import { Genre } from '../models/genre';

export const genreResolver: ResolveFn<Genre> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MusicService).genre(parseInt(route.paramMap.get('id') ?? '', 10));
};
