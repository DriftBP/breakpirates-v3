import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsResolve } from './news.resolve';
import { NewsArticleResolve } from './news-article.resolve';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';

const routes: Routes = [
  { path: '', component: NewsComponent, resolve: { news: NewsResolve }, pathMatch: 'full' },
  { path: ':id', component: NewsArticleComponent, resolve: { article: NewsArticleResolve } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
