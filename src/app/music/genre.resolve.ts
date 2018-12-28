import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MusicService } from './music.service';
import { Genre } from './genre';

@Injectable()
export class GenreResolve implements Resolve<Genre> {

  constructor(private musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.genre(parseInt(route.paramMap.get('id'), 10));
  }
}
