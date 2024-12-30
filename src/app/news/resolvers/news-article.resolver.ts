import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const NewsArticleResolver: ResolveFn<Observable<News>> =
  (route: ActivatedRouteSnapshot): Observable<News> =>
    {
      const newsService = inject(NewsService);

      return newsService.newsArticle(parseInt(route.paramMap.get('id') ?? '', 10));
    }
