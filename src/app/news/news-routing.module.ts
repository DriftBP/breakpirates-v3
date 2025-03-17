import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { newsResolver } from './resolvers/news.resolver';
import { newsArticleResolver } from './resolvers/news-article.resolver';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsResolversModule } from './resolvers/news-resolvers.module';

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
