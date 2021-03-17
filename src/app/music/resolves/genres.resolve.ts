import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MusicService } from '../services/music.service';

import { Genre } from '../genre';
import { MusicResolvesModule } from './music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class GenresResolve implements Resolve<Genre[]> {

  constructor(private readonly musicService: MusicService) {}

  resolve() {
    return this.musicService.genres();
  }
}
