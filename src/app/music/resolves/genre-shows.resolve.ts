import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Show } from '../../schedule/show';
import { MusicService } from '../music.service';
import { MusicResolvesModule } from '../music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class GenreShowsResolve implements Resolve<Show[]> {

  constructor(private readonly musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.shows(parseInt(route.paramMap.get('id'), 10));
  }
}
