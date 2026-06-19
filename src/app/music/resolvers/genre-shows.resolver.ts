import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { MusicService } from '../services/music.service';
import { Show } from '../../schedule/models/show';

export const genreShowsResolver: ResolveFn<Show[]>= (
  route: ActivatedRouteSnapshot
) => {
  return inject(MusicService).shows(parseInt(route.paramMap.get('id') ?? '', 10));
};
