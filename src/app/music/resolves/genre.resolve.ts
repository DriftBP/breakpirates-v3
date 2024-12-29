import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { MusicService } from '../services/music.service';

@Injectable()
export class GenreResolve  {

  constructor(private readonly musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.genre(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}
