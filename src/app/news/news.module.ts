import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturedNewsComponent } from './featured-news/featured-news.component';
import { NewsResolve } from './news.resolve';
import { NewsArticleResolve } from './news-article.resolve';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NewsRoutingModule,
    SharedModule
  ],
  declarations: [NewsComponent, NewsArticleComponent, LatestNewsComponent, FeaturedNewsComponent],
  providers: [
    NewsResolve,
    NewsArticleResolve
  ],
  exports: [
    LatestNewsComponent
  ]
})
export class NewsModule { }
