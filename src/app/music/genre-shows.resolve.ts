import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MusicService } from './music.service';
import { Show } from '../schedule/show';

@Injectable()
export class GenreShowsResolve implements Resolve<Show[]> {

  constructor(private musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.shows(parseInt(route.paramMap.get('id'), 10));
  }
}
