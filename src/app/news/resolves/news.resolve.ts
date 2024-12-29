import { Injectable } from '@angular/core';

import { NewsService } from '../services/news.service';

@Injectable()
export class NewsResolve  {

  constructor(private newsService: NewsService) {}

  resolve() {
    return this.newsService.news();
  }
}
