import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const newsArticleResolver: ResolveFn<News> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(NewsService).newsArticle(parseInt(route.paramMap.get('id') ?? '', 10));
};
