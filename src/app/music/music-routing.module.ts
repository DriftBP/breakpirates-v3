import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenresResolve } from './genres.resolve';
import { GenreResolve } from './genre.resolve';
import { GenreShowsResolve } from './genre-shows.resolve';
import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  { path: '', component: MusicComponent, resolve: { genres: GenresResolve }, pathMatch: 'full' },
  { path: ':id', component: GenreComponent, resolve: { genre: GenreResolve, shows: GenreShowsResolve } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
