import { Injectable } from '@angular/core';

import { MusicService } from '../services/music.service';

import { Genre } from '../models/genre';
import { MusicResolvesModule } from './music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class GenresResolve  {

  constructor(private readonly musicService: MusicService) {}

  resolve() {
    return this.musicService.genres();
  }
}
