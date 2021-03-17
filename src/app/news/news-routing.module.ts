import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsResolve } from './resolves/news.resolve';
import { NewsArticleResolve } from './resolves/news-article.resolve';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsResolvesModule } from './resolves/news-resolves.module';

const routes: Routes = [
  { path: '', component: NewsComponent, resolve: { news: NewsResolve }, pathMatch: 'full' },
  { path: ':id', component: NewsArticleComponent, resolve: { article: NewsArticleResolve } }
];

@NgModule({
  imports: [
    NewsResolvesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
