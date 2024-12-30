import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { MusicService } from '../services/music.service';
import { Genre } from '../models/genre';

export const GenresResolver: ResolveFn<Observable<Genre[]>> =
  (): Observable<Genre[]> =>
    {
      const musicService = inject(MusicService);

      return musicService.genres();
    }
