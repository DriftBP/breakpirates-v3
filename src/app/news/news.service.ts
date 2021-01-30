import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from '../app-settings';
import { News } from './news';

@Injectable()
export class NewsService {

  constructor(
    private http: HttpClient
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
