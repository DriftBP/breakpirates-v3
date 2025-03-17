import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { NewsService } from '../services/news.service';
import { News } from '../models/news';

export const newsResolver: ResolveFn<News[]> = () => {
  return inject(NewsService).news();
};
