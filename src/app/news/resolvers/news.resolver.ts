import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const NewsResolver: ResolveFn<Observable<News[]>> =
  (): Observable<News[]> =>
    {
      const newsService = inject(NewsService);

      return newsService.news();
    }
