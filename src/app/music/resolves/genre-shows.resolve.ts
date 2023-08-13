import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { Show } from '../../schedule/models/show';
import { MusicService } from '../services/music.service';
import { MusicResolvesModule } from './music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class GenreShowsResolve  {

  constructor(private readonly musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.shows(parseInt(route.paramMap.get('id'), 10));
  }
}
