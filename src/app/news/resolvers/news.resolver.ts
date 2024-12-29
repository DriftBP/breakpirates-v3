import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const NewsResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<News[]> =>
    {
      const newsService = inject(NewsService);

      return newsService.news();
    }
