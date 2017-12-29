import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './news-article/news-article.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NewsComponent, NewsArticleComponent]
})
export class NewsModule { }
