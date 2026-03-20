import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { News } from '../../app/news/models/news';
import { mockNews } from '../data/mock.news';

@Injectable()
export class MockNewsService {
  latestNews(): Observable<News[]> {
    return of([ mockNews ]);
  }
}
