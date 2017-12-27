import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../appSettings';
import { Show } from './show';

@Injectable()
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  getNowPlaying(): Observable<Show> {
    return this.http.get<Show>(AppSettings.API_BASE + 'schedule/now-playing', );
  }
}
