import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { SafePipe } from '../shared/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NewsComponent, NewsArticleComponent, SafePipe]
})
export class NewsModule { }
