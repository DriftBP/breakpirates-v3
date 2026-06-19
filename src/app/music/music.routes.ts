import { Routes } from '@angular/router';

import { genresResolver } from './resolvers/genres.resolver';
import { genreResolver } from './resolvers/genre.resolver';
import { genreShowsResolver } from './resolvers/genre-shows.resolver';
import { MusicService } from './services/music.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      MusicService
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./music.component'),
        resolve: {
          genres: genresResolver
        },
        pathMatch: 'full'
      },
      {
        path: ':id',
        loadComponent: () => import('./genre/genre.component'),
        resolve: {
          genre: genreResolver,
          shows: genreShowsResolver
        }
      }
    ]
  }
];
