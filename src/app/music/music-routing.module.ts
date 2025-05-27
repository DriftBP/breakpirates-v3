import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { genresResolver } from './resolvers/genres.resolver';
import { genreResolver } from './resolvers/genre.resolver';
import { genreShowsResolver } from './resolvers/genre-shows.resolver';
import { MusicResolversModule } from './resolvers/music-resolvers.module';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./music.component').then(mod => mod.MusicComponent),
    resolve: {
      genres: genresResolver
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./genre/genre.component').then(mod => mod.GenreComponent),
    resolve: {
      genre: genreResolver,
      shows: genreShowsResolver
    }
  }
];

@NgModule({
  imports: [
    MusicResolversModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
