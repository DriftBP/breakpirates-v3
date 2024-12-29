import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const NewsArticleResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News> =>
    {
      const newsService = inject(NewsService);

      return newsService.newsArticle(parseInt(route.paramMap.get('id') ?? '', 10));
    }
