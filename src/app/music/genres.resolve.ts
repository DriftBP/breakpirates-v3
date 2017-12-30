import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { MusicService } from './music.service';
import { Genre } from './genre';

@Injectable()
export class GenresResolve implements Resolve<Genre[]> {

  constructor(private musicService: MusicService) {}

  resolve() {
    return this.musicService.genres();
  }
}