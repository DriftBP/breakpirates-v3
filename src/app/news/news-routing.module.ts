import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsResolver } from './resolvers/news.resolver';
import { NewsArticleResolver } from './resolvers/news-article.resolver';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';


const routes: Routes = [
  { path: '', component: NewsComponent, resolve: { news: NewsResolver }, pathMatch: 'full' },
  { path: ':id', component: NewsArticleComponent, resolve: { article: NewsArticleResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
