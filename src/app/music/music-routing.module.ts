import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';

import { GenresResolver } from './resolvers/genres.resolver';
import { GenreResolver } from './resolvers/genre.resolver';
import { GenreShowsResolver } from './resolvers/genre-shows.resolver';

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    resolve: {
      genres: GenresResolver
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: GenreComponent,
    resolve: {
      genre: GenreResolver,
      shows: GenreShowsResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
]
  ,
  exports: [RouterModule]
})
export class MusicRoutingModule { }
