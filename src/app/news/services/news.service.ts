import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { News } from '../models/news';
import { NewsResolvesModule } from '../resolves/news-resolves.module';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: NewsResolvesModule
})
export class NewsService {

  constructor(
    private http: HttpRequestService
  ) { }

  news(): Observable<News[]> {
    return this.http.get<News[]>(AppSettings.API_BASE + 'news');
  }

  newsArticle(id: number): Observable<News> {
    return this.http.get<News>(AppSettings.API_BASE + `news/${id}`);
  }

  latestNews(): Observable<News[]> {
    return this.http.get<News[]>(AppSettings.API_BASE + 'news/latest');
  }
}
