import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { MusicService } from '../services/music.service';

@Injectable()
export class GenreShowsResolve  {

  constructor(private readonly musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.shows(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}
