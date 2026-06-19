import { Routes } from '@angular/router';

import { newsResolver } from './resolvers/news.resolver';
import { newsArticleResolver } from './resolvers/news-article.resolver';
import { NewsService } from './services/news.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      NewsService
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./news.component'),
        resolve: {
          news: newsResolver
        },
        pathMatch: 'full'
      },
      {
        path: ':id',
        loadComponent: () => import('./news-article/news-article.component'),
        resolve: {
          article: newsArticleResolver
        }
      }
    ]
  }
];
