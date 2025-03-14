import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { MusicService } from '../services/music.service';
import { Genre } from '../models/genre';

export const genresResolver: ResolveFn<Genre[]>= () => {
  return inject(MusicService).genres();
};
