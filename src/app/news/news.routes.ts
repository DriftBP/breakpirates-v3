import { Routes } from '@angular/router';

import { newsResolver } from './resolvers/news.resolver';
import { newsArticleResolver } from './resolvers/news-article.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./news.component').then(mod => mod.NewsComponent),
    resolve: {
      news: newsResolver
    },
    pathMatch: 'full' },
  {
    path: ':id',
    loadComponent: () => import('./news-article/news-article.component').then(mod => mod.NewsArticleComponent),
    resolve: {
      article: newsArticleResolver
    }
  }
];
