import { Injectable } from '@angular/core';

import { MusicService } from '../services/music.service';

@Injectable()
export class GenresResolve  {

  constructor(private readonly musicService: MusicService) {}

  resolve() {
    return this.musicService.genres();
  }
}
