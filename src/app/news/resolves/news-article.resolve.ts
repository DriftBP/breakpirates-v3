import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';
import { NewsResolvesModule } from './news-resolves.module';

@Injectable({
  providedIn: NewsResolvesModule
})
export class NewsArticleResolve implements Resolve<News> {

  constructor(private newsService: NewsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.newsService.newsArticle(parseInt(route.paramMap.get('id'), 10));
  }
}
