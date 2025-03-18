import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';
import { GenreComponent } from './genre/genre.component';
import { genresResolver } from './resolvers/genres.resolver';
import { genreResolver } from './resolvers/genre.resolver';
import { genreShowsResolver } from './resolvers/genre-shows.resolver';
import { MusicResolversModule } from './resolvers/music-resolvers.module';

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
    MusicResolversModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
