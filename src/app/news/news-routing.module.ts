import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { newsResolver } from './resolves/news.resolver';
import { newsArticleResolver } from './resolves/news-article.resolver';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsResolversModule } from './resolves/news-resolvers.module';

const routes: Routes = [
  {
    path: '', component: NewsComponent,
    resolve: {
      news: newsResolver
    },
    pathMatch: 'full' },
  {
    path: ':id', component: NewsArticleComponent,
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
