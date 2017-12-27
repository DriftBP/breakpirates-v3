import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { NewsService } from './news.service';
import { News } from './news';

@Injectable()
export class NewsResolve implements Resolve<News[]> {

  constructor(private newsService: NewsService) {}

  resolve() {
    return this.newsService.news();
  }
}