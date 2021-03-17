import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MusicService } from '../services/music.service';

import { Genre } from '../models/genre';
import { MusicResolvesModule } from './music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class GenreResolve implements Resolve<Genre> {

  constructor(private readonly musicService: MusicService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.musicService.genre(parseInt(route.paramMap.get('id'), 10));
  }
}
