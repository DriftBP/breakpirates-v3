import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { SafePipe } from '../shared/safe.pipe';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturedNewsComponent } from './featured-news/featured-news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [NewsComponent, NewsArticleComponent, LatestNewsComponent, FeaturedNewsComponent],
  exports: [
    LatestNewsComponent
  ]
})
export class NewsModule { }
