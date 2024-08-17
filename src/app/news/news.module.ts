import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturedNewsComponent } from './featured-news/featured-news.component';
import { NewsRoutingModule } from './news-routing.module';
import { IsoDatePipe } from './pipes/iso-date.pipe';
import { FormattedDatePipe } from './pipes/formatted-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NewsRoutingModule,
    SharedModule,
    MatButtonModule
  ],
  declarations: [
    NewsComponent,
    NewsArticleComponent,
    LatestNewsComponent,
    FeaturedNewsComponent,
    IsoDatePipe,
    FormattedDatePipe
  ]
})
export class NewsModule { }
