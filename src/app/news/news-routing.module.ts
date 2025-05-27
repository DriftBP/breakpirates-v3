import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { newsResolver } from './resolvers/news.resolver';
import { newsArticleResolver } from './resolvers/news-article.resolver';
import { NewsResolversModule } from './resolvers/news-resolvers.module';

const routes: Routes = [
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

@NgModule({
  imports: [
    NewsResolversModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
