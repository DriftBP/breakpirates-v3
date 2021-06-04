import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { MusicResolvesModule } from './resolves/music-resolves.module';
import { GenresResolve } from './resolves/genres.resolve';
import { GenreResolve } from './resolves/genre.resolve';
import { GenreShowsResolve } from './resolves/genre-shows.resolve';

const routes: Routes = [
  { path: '', component: MusicComponent, resolve: { genres: GenresResolve }, pathMatch: 'full' },
  { path: ':id', component: GenreComponent, resolve: { genre: GenreResolve, shows: GenreShowsResolve } }
];

@NgModule({
  imports: [
    MusicResolvesModule,
    RouterModule.forChild(routes)]
  ,
  exports: [RouterModule]
})
export class MusicRoutingModule { }
