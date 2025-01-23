import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { genresResolver } from './resolves/genres.resolve';
import { genreResolver } from './resolves/genre.resolve';
import { genreShowsResolver } from './resolves/genre-shows.resolve';
import { MusicResolvesModule } from './resolves/music-resolves.module';

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    resolve: {
      genres: genresResolver
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: GenreComponent,
    resolve: {
      genre: genreResolver,
      shows: genreShowsResolver
    }
  }
];

@NgModule({
  imports: [
    MusicResolvesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
