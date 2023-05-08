import { Injectable } from '@angular/core';


import { NewsService } from '../services/news.service';
import { News } from '../models/news';
import { NewsResolvesModule } from './news-resolves.module';

@Injectable({
  providedIn: NewsResolvesModule
})
export class NewsResolve  {

  constructor(private newsService: NewsService) {}

  resolve() {
    return this.newsService.news();
  }
}
