import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';
import { NewsResolvesModule } from './news-resolves.module';

@Injectable({
  providedIn: NewsResolvesModule
})
export class NewsArticleResolve  {

  constructor(private newsService: NewsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.newsService.newsArticle(parseInt(route.paramMap.get('id'), 10));
  }
}
