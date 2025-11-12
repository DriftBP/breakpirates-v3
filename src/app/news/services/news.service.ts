import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { News } from '../models/news';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable()
export class NewsService {
  private httpRequestService = inject(HttpRequestService);


  news(): Observable<News[]> {
    return this.httpRequestService.get<News[]>(AppSettings.API_BASE + 'news');
  }

  newsArticle(id: number): Observable<News> {
    return this.httpRequestService.get<News>(AppSettings.API_BASE + `news/${id}`);
  }

  latestNews(): Observable<News[]> {
    return this.httpRequestService.get<News[]>(AppSettings.API_BASE + 'news/latest');
  }
}
