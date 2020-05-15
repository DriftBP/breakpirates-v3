import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { ScheduleModule } from '../schedule/schedule.module';
import { MusicRoutingModule } from './music-routing.module';
import { GenresResolve } from './genres.resolve';
import { GenreResolve } from './genre.resolve';
import { GenreShowsResolve } from './genre-shows.resolve';
import { MusicService } from './music.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MusicRoutingModule,
    ScheduleModule
  ],
  declarations: [MusicComponent, GenreComponent],
  providers: [
    GenresResolve,
    GenreResolve,
    GenreShowsResolve,
    MusicService
  ]
})
export class MusicModule { }
